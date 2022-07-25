import styles from './button.module.css';

const LoadMoreBtn = ({ loadMoreClick }) => {
  return (
    <button type="button" className={styles.Button} onClick={loadMoreClick}>
      Load more
    </button>
  );
};

export default LoadMoreBtn;
