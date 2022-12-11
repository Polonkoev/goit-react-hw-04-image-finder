import { useState } from 'react';
import { Notify } from 'notiflix';
import css from '../Searchbar/Searchbar.module.css';

export const  Searchbar =({dataHandler})=>{
  const [q, setQ] = useState('')
 

  const inputHandler = ({ target: { value } }) => {
    setQ(value) ;
  };


  const submitHandler = event => {
    event.preventDefault();
    if (q === '') {
      Notify.info(' Please enter something .. ');
    }
    dataHandler(q)
    setQ('')
    
  };

  
    return (
      <header className={css.Searchbar}>
        <form onSubmit={submitHandler} className={css.SearchForm}>
          <button className={css.SearchForm_button} type="submit">
            <span>Search</span>
          </button>
          <input
            value={q}
            name="name"
            onChange={inputHandler}
            className={css.SearchForm_input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
    }


export default Searchbar;
