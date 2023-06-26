import React from 'react';
import Header from '../Header/Header';
import './Container.css';

const Container = ({ main }) => {
  return (
    <div className='container'>
      <div className='container-header'>
        <Header />
      </div>    
      <main className='container-main'>
        {main}
      </main>
    </div>
  );
};

export default Container;
