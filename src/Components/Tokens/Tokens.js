import React, { useContext } from "react";
import MyContext from "../../Context/MyContext";
import ClosedCaption from "../ClosedCaption/ClosedCaption";
import './Tokens.css';

const Tokens = () => {

  const { isTokensEnabled, tokenValue, handleTokensCheckboxChange, handleTokensInputChange } = useContext(MyContext);

  return (
    <div className="tokens">
      <label className="container-tokens">
        <input
          type="checkbox"
          checked={isTokensEnabled}
          onChange={handleTokensCheckboxChange}
        />
        <div className="checkmark"></div>  
      </label>
      <label>
        Tokens
      </label>
      <input
          className="tokens-input"
          type="number"
          max={10000}
          value={tokenValue !== null ? tokenValue : ""}
          onChange={handleTokensInputChange}
          disabled={!isTokensEnabled}
        />
      <ClosedCaption text='Limita o número máximo de tokens(uma média de palavras), desabilite essa opção e o chat irá responder com configuração padrão' />
    </div>
  );
};

export default Tokens;