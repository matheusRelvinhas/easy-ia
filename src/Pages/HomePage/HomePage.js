import React from 'react';
import UserForm from '../../Components/UserForm/UserForm';
import Chat from '../../Components/Chat/Chat';
import Container from '../../Components/Container/Container';
import PersonaForm from '../../Components/PersonaForm/PersonaForm';
import PersonaList from '../../Components/PersonaList/PersonaList';
//import HamburguerMenu from '../../Components/HamburguerMenu/HamburguerMenu';

const HomePage = () => {
  return (
    <Container
      main={
        <>
          <Chat/>
          <UserForm />
          <PersonaForm/>
          <PersonaList/>
        </>
      }
    /> 
  );
}

export default HomePage;
