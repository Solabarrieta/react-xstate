import React from 'react';
import { useMachine } from '@xstate/react';
import { Nav } from '../components/nav';
import { StepsLayout } from './StepsLayout';
import {bookingMachine} from '../machines/bookingMachine';
import './BaseLayout.css';

export const BaseLayout = () => {
  const [state, send] = useMachine(bookingMachine);
  return (
    <div className='BaseLayout'>
      <Nav state={state} send={send}/>
      <StepsLayout state={state} send={send} />
    </div>
  );
}