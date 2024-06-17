import React, { useState } from 'react';
import './search.css';

export const Search = ({ send, context }) => {
  const [flight, setFlight] = useState('');

  const handleSelectChange = (event) => {
    setFlight(event.target.value);
  };
  let options = []
  if (context.countries) {
    options = [...context.countries]
  } else {
    options = ['Mexico', 'Venezuela', 'Colombia'];
  }

    const goToPassengers = () => {
      send({type: 'CONTINUE', selectedCountry: flight})
    }
  return (
    <div className='Search'>
      <p className='Search-title title'>Busca tu destino</p>
      <select id="country" className='Search-select' value={flight} onChange={handleSelectChange}>
        <option value="" disabled defaultValue>Escoge un país</option>
        {options.map((option) => <option value={option.name.common} key={option.name.common}>{option.name.common}</option>)}
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