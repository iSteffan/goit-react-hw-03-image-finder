import { Overlay, ModalWindow } from './Modal.styled';
import { Component } from 'react';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', e => {
      if (e.code === 'Escape') {
        this.props.onClose();
      }
    });
  }

  render() {
    const { img, alt } = this.props;

    return (
      <Overlay>
        <ModalWindow>
          <img src={img} alt={alt} />
        </ModalWindow>
      </Overlay>
    );
  }
}
