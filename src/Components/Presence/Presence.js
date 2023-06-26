import React, { useContext } from "react";
import MyContext from "../../Context/MyContext";
import ClosedCaption from "../ClosedCaption/ClosedCaption";
import './Presence.css';

const Presence = () => {

  const { presence, handlePresenceChange } = useContext(MyContext);

  return (
    <div className="presence">
      <label htmlFor="presence">Presence</label>
      <input
        type="range"
        className="presence-input"
        min="0.0"
        max="1.0"
        step="0.1"
        value={presence}
        onChange={handlePresenceChange}
      />
      <span>{presence.toFixed(1)}</span>
      <ClosedCaption text='Controla a aderência às sugestões do usuário. Valores altos (por exemplo, 1.0) tornam o modelo mais criativo, enquanto valores baixos (por exemplo, 0.0) o fazem seguir estritamente as sugestões.' />
    </div>
  );
};

export default Presence;