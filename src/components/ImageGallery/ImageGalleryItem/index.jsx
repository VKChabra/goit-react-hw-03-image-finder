import { useState } from 'react';
import styles from './imageGalleryItem.module.css';
import Modal from 'components/Modal';

const ImageGalleryItem = ({ smallImgUrl, largeImageURL, tags }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <li
      className={styles.ImageGalleryItem}
      onClick={() => setIsModalOpen(true)}
    >
      {isModalOpen && (
        <Modal
          largeImageURL={largeImageURL}
          onClose={() => setIsModalOpen(false)}
        />
      )}
      <img
        src={smallImgUrl}
        alt={tags}
        className={styles.ImageGalleryItem_image}
      />
    </li>
  );
};

export default ImageGalleryItem;
