import React, { useContext } from 'react';
import Frequency from '../Frequency/Frequency';
import Presence from '../Presence/Presence';
import NumberAnswers from '../NumberAnswers/NumberAnswers';
import Temperature from '../Temperature/Temperature';
import Tokens from '../Tokens/Tokens';
import MyContext from '../../Context/MyContext';

import './Hamburger.css';
import ContextPrompt from '../ContextPrompt/ContextPrompt';

const Hamburger = () => {

  const { dataCss, isOpen, handleCheckboxChange } = useContext(MyContext);

  return (
    <div className="tab-itens">
      <label className="hamburger">
        <input
          type="checkbox"
          id="checkbox"
          checked={isOpen}
          onChange={handleCheckboxChange}
        />
        <svg viewBox="0 0 32 32">
          <path
            className="line line-top-bottom"
            d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
          ></path>
          <path className="line" d="M7 16 27 16"></path>
        </svg>
      </label>
      {isOpen && (
        <div style={{backgroundColor: dataCss.primaryColor}} className="tab-content div-shadow">
          <div className="tab-itens">
            <Temperature />
            <Frequency />
            <Presence />
            <NumberAnswers />
            <Tokens />
            <ContextPrompt />
          </div>
        </div>
      )}
    </div>
  );
};

export default Hamburger;
