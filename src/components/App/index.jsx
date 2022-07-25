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
      this.setState({ status: 'pending' });
      const { hits } = await fetchImages(searchQuery, page);

      if (hits.length === 0) {
        this.setState({ status: 'rejected' });
        // return alert('Nothing was found for your query');
        this.setState({ error: 'Nothing was found for your query' });
      } else {
        this.setState(({ images }) => ({ images: [...images, ...hits] }));
        this.setState({ status: 'resolved' });
      }
    } catch (error) {
      console.log(error);
      this.setState({ status: 'rejected' });
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
    const { images, status, error } = this.state;

    if (status === 'idle') {
      return <p>Please enter search query</p>;
    }

    if (status === 'pending') {
      return <Loader />;
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
            marginTop: 10 + 'px',
          }}
        >
          <ImageGallery images={images} />
          <LoadMoreBtn loadMoreClick={this.loadMore} />
        </div>
      );
    }
  };

  render() {
    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {this.statusMarkups()}
        {/* {this.state.status === 'pending' && <Loader />} */}
      </div>
    );
  }
}
