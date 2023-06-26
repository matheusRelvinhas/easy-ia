import React, { useContext } from "react";
import MyContext from "../../Context/MyContext";
import ClosedCaption from "../ClosedCaption/ClosedCaption";
import './Frequency.css';

const Frequency = () => {

  const { frequency, handleFrequencyChange } = useContext(MyContext);
  
  return (
    <div className="frequency">
      <label htmlFor="frequency">Frequency</label>
      <input
        type="range"
        className="frequency-input"
        min="0.0"
        max="1.0"
        step="0.1"
        value={frequency}
        onChange={handleFrequencyChange}
      />
      <span>{frequency.toFixed(1)}</span>
      <ClosedCaption text='Controla a repetição de respostas. Valores mais altos incentivam o modelo a evitar repetições, enquanto valores mais baixos permitem mais repetições. É útil em chatbots para evitar respostas repetitivas.' />
    </div>
  );
};

export default Frequency;
