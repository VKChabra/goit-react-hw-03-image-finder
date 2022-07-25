import { Component } from 'react';
import fetchImages from 'services/Api.js';
import Searchbar from 'components/Searchbar';
import Loader from 'components/Loader';
import ImageGallery from 'components/ImageGallery';
import LoadMoreBtn from 'components/Button';

export class App extends Component {
  state = {
    images: [],
    searchQuery: '',
    page: 1,
    error: null,
    status: 'idle',
    loading: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchQuery, page } = this.state;
    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      this.fetchSearchQuery();
      return;
    }
  }

  fetchSearchQuery = async () => {
    const { searchQuery, page } = this.state;

    try {
      this.setState({ loading: true });
      const { hits } = await fetchImages(searchQuery, page);

      if (hits.length === 0) {
        this.setState({
          status: 'rejected',
          loading: false,
          error: 'Nothing was found for your query, try something else',
        });
      } else {
        this.setState(({ images }) => ({ images: [...images, ...hits] }));
        this.setState({ status: 'resolved', loading: false });
      }
    } catch (error) {
      this.setState({
        status: 'rejected',
        loading: false,
        error: await fetchImages(searchQuery, page),
      });
    }
  };

  loadMore = () => {
    this.setState(({ page }) => ({
      page: page + 1,
    }));
  };

  handleFormSubmit = searchQuery => {
    this.setState({ searchQuery, page: 1, images: [] });
  };

  statusMarkups = () => {
    const { images, status, error, loading } = this.state;

    if (status === 'idle') {
      return (
        <h2 style={{ display: 'flex', justifyContent: 'center' }}>
          Please enter search query
        </h2>
      );
    }

    if (status === 'rejected') {
      return <h1>{error}</h1>;
    }

    if (status === 'resolved') {
      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '10px',
          }}
        >
          <ImageGallery images={images} />
          {!loading && <LoadMoreBtn loadMoreClick={this.loadMore} />}
        </div>
      );
    }
  };

  render() {
    const { handleFormSubmit, statusMarkups } = this;
    return (
      <div>
        <Searchbar onSubmit={handleFormSubmit} />
        {statusMarkups()}
        {this.state.loading && <Loader />}
      </div>
    );
  }
}
