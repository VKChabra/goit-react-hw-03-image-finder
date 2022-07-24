import { Component } from 'react';
import styles from './searchbar.module.css';
import { BsSearch as SearchIcon } from 'react-icons/bs';

export default class Searchbar extends Component {
  state = {
    searchQuery: '',
  };

  handleQueryChange = event => {
    this.setState({ searchQuery: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();
    const SearchbarForm = document.querySelector(`.${styles.Searchbar}`);
    if (this.state.searchQuery.trim() === '') {
      return alert('Insert text first');
    }
    this.props.onSubmit(this.state.searchQuery);
    this.setState({ searchQuery: '' });
    SearchbarForm.reset();
  };

  render() {
    return (
      <header className={styles.Searchbar}>
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
