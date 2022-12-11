import { useState, useEffect } from 'react';
import { BallTriangle } from 'react-loader-spinner';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import css from './App.module.css';
import { fetchImages } from './Query/Query';
import Searchbar from './Searchbar/Searchbar';
import { imageMapper } from './imageMapper/imageMapper';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import Modal from './Modal/Modal';

export const App = () => {
  const [response, setResponse] = useState([]);
  const [page, setPage] = useState(1);
  const [q, setQ] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isShown, setIsShown] = useState(false);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [fetchError, setFetchError] = useState(null);
 

  useEffect(() => {
    if (page !== 1 || q !== '') {
      if (q !== '') {
        setIsLoading(true);
  
        fetchImages(page, q)
          .then(({ data: { hits } }) => {
            hits.length >= 12 ? setIsLoadMore(true) : setIsLoadMore(false);
            hits.length === 0 && Notify.failure('Image note found..');
            setResponse((response)=>[...response, ...imageMapper(hits)]);
            setIsShown(true);
            
            
          })
          .catch(error => {
            setFetchError(error.message);
            setIsShown(false);
            if(fetchError !== null){
              Notify.failure(`Houston we have some "${fetchError}" problems...`)}
          })
          .finally(() => setIsLoading(false));
      } else {
        setIsLoadMore(false);
  
        return;
      }
    }
  }, [page, q, fetchError]);

  
  

  
  const dataHandler = data => {
    setQ(data);
    setPage(1);
    setResponse([]);
    setIsShown(false);
    setIsLoadMore(false);
    setIsLoading(false);

   
  };

  const nextPageHandler = () => {
    setPage(page + 1);

  };

  const openModal = data => {
    
    setCurrentImage(data)
  };

  const closeModal = () => {
  setCurrentImage (null);
  };

  return (
    <>
      <Searchbar dataHandler={dataHandler} />
      {isShown && <ImageGallery data={response} openModal={openModal} />}

      {isLoadMore && <Button text="Load more" handler={nextPageHandler} />}
      {currentImage !== null && (
        <Modal closeModal={closeModal} data={currentImage} />
      )}
      {/* <Modal data={currentImage} /> */}

      {isLoading && (
        <BallTriangle
          height={100}
          width={100}
          radius={5}
          color="#3f51b5"
          ariaLabel="ball-triangle-loading"
          wrapperClass={css.spiner}
          wrapperStyle=""
          visible={true}
        />
      )}
    </>
  );
};

export default App;
