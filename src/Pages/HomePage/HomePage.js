import React from 'react';
import Chat from '../../Components/Chat/Chat';
import Container from '../../Components/Container/Container';
//import HamburguerMenu from '../../Components/HamburguerMenu/HamburguerMenu';

const HomePage = () => {
  return (
    <Container
      main={
        <Chat/>  
      }
    /> 
  );
}

export default HomePage;
