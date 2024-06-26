import React from 'react';
import { Welcome } from '../components/welcome';
import { Search } from '../components/search';
import { Passengers } from '../components/passengers';
import { Tickets } from '../components/tickets';
import './StepsLayout.css';

export const StepsLayout = ({ state, send }) => {
  const renderContent = () => {
    if(state.matches('initial')) return <Welcome send={send} />;
    if(state.matches('search')) return <Search send={send} context={state.context}/>;
    if(state.matches('passengers')) return <Passengers state={state} send={send} />;
    if (state.matches('tickets')) return <Tickets send={send} context={state.context } />;
    return null
  };

  return (
    <div className='StepsLayout'>
      {renderContent()}
    </div>
  );
}; 