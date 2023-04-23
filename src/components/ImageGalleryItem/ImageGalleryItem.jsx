import { ListItem, Image } from './ImageGalleryItem.styled';
import { Modal } from 'components/Modal/Modal';
import { Component } from 'react';

export class ImageGalleryItem extends Component {
  state = {
    isModalShown: false,
    modalImg: '',
    modalAlt: '',
  };

  onSave = (img, alt) => {
    this.setState({
      isModalShown: true,
      modalImg: img,
      modalAlt: alt,
    });
  };

  onClose = () => {
    this.setState({
      isModalShown: false,
    });
  };

  render() {
    const {
      images: { images },
    } = this.props;
    const { isModalShown, modalImg, modalAlt } = this.state;

    return (
      <>
        {images.map(item => (
          <ListItem
            key={item.id}
            onClick={evt => {
              this.onSave(item.largeImageURL, item.tags);
            }}
          >
            <Image loading="lazy" src={item.webformatURL} alt={item.tags} />
            {isModalShown && (
              <Modal alt={modalAlt} img={modalImg} onClose={this.onClose} />
            )}
          </ListItem>
        ))}
      </>
    );
  }
}
