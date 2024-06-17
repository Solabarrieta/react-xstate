import React from 'react'
import './nav.css';

export const Nav = ({ state, send }) => {

  const goToInitial = () => {
    send({type: "CANCEL"})
  }
  
  return (
    <nav className='Nav'>
      <h1 className='Nav-logo'>Book a fly ✈</h1>
      {!state.matches('initial') && !state.matches('tickets') &&
        <button
          className='Nav-cancel button-secondary'
          onClick={goToInitial}
        >
          Cancelar
        </button>
      }
      
    </nav>
  );
}; 