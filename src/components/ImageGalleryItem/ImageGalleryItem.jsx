import { ListItem, Image } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ images }) => {
  return (
    <>
      {images.images.map(item => (
        <ListItem key={item.id}>
          <Image loading="lazy" src={item.webformatURL} alt={item.tags} />
        </ListItem>
      ))}
    </>
  );
};
