import { Overlay, ModalWindow } from './Modal.styled';

export const Modal = ({ alt, img }) => {
  return (
    <Overlay>
      <ModalWindow>
        <img src={img} alt={alt} />
      </ModalWindow>
    </Overlay>
  );
};
