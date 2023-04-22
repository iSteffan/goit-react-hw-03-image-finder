import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { GalleryList } from './ImageGallery.styled';

export const ImageGallery = images => {
  return (
    <GalleryList>
      <ImageGalleryItem images={images} />
    </GalleryList>
  );
};
