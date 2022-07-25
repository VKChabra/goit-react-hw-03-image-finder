import styles from './imageGalleryItem.module.css';

const ImageGalleryItem = ({ smallImgUrl, largeImageURL, tags }) => {
  return (
    <li className={styles.ImageGalleryItem}>
      <a href={largeImageURL}>
        <img
          src={smallImgUrl}
          alt={tags}
          className={styles.ImageGalleryItem_image}
        />
      </a>
    </li>
  );
};

export default ImageGalleryItem;
