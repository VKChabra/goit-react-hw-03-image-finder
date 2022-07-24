import { Component } from 'react';

// import CreditsApi from 'components/CreditsApi';
import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';

export class App extends Component {
  state = {
    gallery: null,
    searchQuery: '',
    page: 1,
  };

  handleFormSubmit = searchQuery => {
    this.setState({ searchQuery });
  };

  render() {
    return (
      <div>
        {/* <CreditsApi /> */}
        <Searchbar onSubmit={this.handleFormSubmit} />
        {this.state.gallery && <div>Gallery</div>}
        <ImageGallery />
      </div>
    );
  }
}
