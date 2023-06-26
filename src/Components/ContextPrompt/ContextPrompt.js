import React, { useContext } from 'react';
import MyContext from '../../Context/MyContext';
import ClosedCaption from '../ClosedCaption/ClosedCaption';
import './ContextPrompt.css';

const ContextPrompt = () => {
  const { contextPrompt, handleInputContextChange } = useContext(MyContext);

  return (
    <div className='context-prompt'>
      <input
        className='context-prompt-input'
        type="text"
        value={contextPrompt}
        placeholder="context"
        onChange={handleInputContextChange}
      />
      <ClosedCaption text='Contexto para o chat, evita repetir o mesmo prompt, ex: resuma em poucas palavras' />
    </div>
  );
};

export default ContextPrompt;
