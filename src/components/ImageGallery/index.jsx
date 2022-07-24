import { Component } from 'react';

export default class ImageGallery extends Component {
  state = {
    searchQuery: '',
  };

  render() {
    return <ul className="gallery">{'Набір <li> із зображеннями'}</ul>;
  }
}
