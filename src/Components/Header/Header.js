import React, { useContext } from 'react';
import MyContext from '../../Context/MyContext';
import './Header.css';
import Hamburger from '../Hamburger/Hamburger';

const Header = () => {

  const { dataCss, handleUserButtonClick, savedUser } = useContext(MyContext);

  return (
    <header style={{background: dataCss.primaryColor}} className="header">
      <Hamburger />
      <figure className='logo-container'>
        <picture>
          <source src={dataCss.logoImage[3]} type="image/webp" />
          <source src={dataCss.logoImage[2]} type="image/png" />
          <source src={dataCss.logoImage[1]} type="image/webp" />
          <source src={dataCss.logoImage[0]} type="image/png" />
          <img className='logo' src={dataCss.logoImage[2]} height='50vh' width='100vw' alt="logo-img" />
        </picture>
      </figure>
      <div className='user'>
        <button className="button-header" onClick={handleUserButtonClick}>
          <span>{savedUser}</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
