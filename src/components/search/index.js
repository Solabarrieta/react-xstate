import React, { useState } from 'react';
import './search.css';
import { type } from '@testing-library/user-event/dist/type';

export const Search = ({ send, context }) => {
  const [flight, setFlight] = useState('');

  const handleSelectChange = (event) => {
    setFlight(event.target.value);
  };

  const options = ['Mexico', 'Venezuela', 'Colombia'];

  const goToPassengers = () => {
    send({type: 'CONTINUE'})
  }
  return (
    <div className='Search'>
      <p className='Search-title title'>Busca tu destino</p>
      <select id="country" className='Search-select' value={flight} onChange={handleSelectChange}>
        <option value="" disabled defaultValue>Escoge un país</option>
        {options.map((option) => <option value={option} key={option}>{option}</option>)}
      </select>
      <button
        disabled={flight === ''}
        className='Search-continue button'
        onClick={goToPassengers}
      >
        Continuar
      </button>
    </div>
  );
}; 