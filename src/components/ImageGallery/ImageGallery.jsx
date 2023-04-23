import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { GalleryList } from './ImageGallery.styled';

// Транзитний елемент, слугує для передачі пропсів в li
export const ImageGallery = images => {
  return (
    <GalleryList>
      <ImageGalleryItem images={images} />
    </GalleryList>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
};
