import React, { useContext } from "react";
import MyContext from "../../Context/MyContext";
import ClosedCaption from "../ClosedCaption/ClosedCaption";
import './Temperature.css';

const Temperature = () => {

  const { temperature, handleTemperatureChange } = useContext(MyContext);

  return (
    <div className="temperature">
      <label htmlFor="temperature">Temperature</label>
      <input
        type="range"
        className="temperature-input"
        min="0.0"
        max="1.0"
        step="0.1"
        value={temperature}
        onChange={handleTemperatureChange}
      />
      <span>{temperature.toFixed(1)}</span>
      <ClosedCaption text='Controla a aleatoriedade das respostas. Valores altos (por exemplo, 0.8) tornam as respostas mais diversificadas, enquanto valores baixos (por exemplo, 0.2) as tornam mais determinísticas.' />
    </div>
  );
};

export default Temperature;
