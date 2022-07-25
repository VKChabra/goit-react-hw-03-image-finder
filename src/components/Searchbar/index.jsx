import { Component } from 'react';
import styles from './searchbar.module.css';
import { BsSearch as SearchIcon } from 'react-icons/bs';
import CreditsApi from 'components/CreditsApi';

export default class Searchbar extends Component {
  state = {
    searchQuery: '',
  };

  handleQueryChange = event => {
    this.setState({ searchQuery: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.searchQuery.trim() === '') {
      return alert('Insert text first');
    }
    this.props.onSubmit(this.state.searchQuery);
    this.setState({ searchQuery: '' });
  };

  render() {
    return (
      <header className={styles.Searchbar}>
        <CreditsApi />
        <form onSubmit={this.handleSubmit}>
          <button type="submit">
            <SearchIcon size="14" />
          </button>
          <input
            type="text"
            placeholder="Enter text here"
            onChange={this.handleQueryChange}
          />
        </form>
      </header>
    );
  }
}
