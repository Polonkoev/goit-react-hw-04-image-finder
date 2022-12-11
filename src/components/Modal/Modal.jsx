import { useEffect } from 'react';
import css from '../Modal/Modal.module.css';

export const Modal = ({ closeModal, data }) => {
  useEffect(() => {
    window.addEventListener('keydown', closeByEsc);
    return () => {
      window.removeEventListener('keydown', closeByEsc);
    };
  });

  const closeByEsc = ({ code }) => {
    if (code === 'Escape') {
      closeModal();
    }
  };

  return (
    <div onClick={() => closeModal()} className={css.Overlay}>
      <div className={css.Modal}>
        <img className={css.Modal} src={data} alt="largeURL" />
      </div>
    </div>
  );
};

export default Modal;
