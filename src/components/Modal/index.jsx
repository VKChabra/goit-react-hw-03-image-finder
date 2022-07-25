import styles from './modal.module.css';

const Modal = ({ largeImageURL, tags, onClose }) => {
  const onKeyEscape = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  const onClickOverlay = e => {
    if (e.target.tagName !== 'IMG') {
      onClose();
    }
  };

  return (
    <div
      className={styles.Overlay}
      onClickCapture={onClickOverlay}
      onKeyDown={onKeyEscape}
      tabIndex="0"
    >
      <div className={styles.Modal}>
        <img src={largeImageURL} alt={tags} />
      </div>
    </div>
  );
};

export default Modal;
