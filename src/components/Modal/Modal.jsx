import { useEffect } from 'react';
import css from '../Modal/Modal.module.css';

export const Modal = ({ closeModal, data }) => {
  useEffect(() => {
    const closeByEsc = ({ code }) => {
      if (code === 'Escape') {
        closeModal();
      }
    };
    window.addEventListener('keydown', closeByEsc);
    return () => {
      window.removeEventListener('keydown', closeByEsc);
    };
  }, [closeModal]);

  

  return (
    <div onClick={(event) => {if(event.target === event.currentTarget){closeModal()}} } className={css.Overlay}>
      <div className={css.Modal}>
        <img className={css.Modal} src={data} alt="largeURL" />
      </div>
    </div>
  );
};

export default Modal;
