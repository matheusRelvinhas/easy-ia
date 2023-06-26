import React, { useContext } from "react";
import MyContext from "../../Context/MyContext";
import ClosedCaption from "../ClosedCaption/ClosedCaption";
import './NumberAnswers.css';

const NumberAnswers = () => {

  const { isAnswerEnabled, answerValue, handleAnswerCheckboxChange, handleAnswerInputChange } = useContext(MyContext);
 
  return (
    <div className="number-answers">
        <label className='container-number-answers'>
        <input
          type="checkbox"
          checked={isAnswerEnabled}
          onChange={handleAnswerCheckboxChange}
        />
        <div className="checkmark"></div>
      </label>
      <label>
      Answers
      </label>
      <input
          className="number-answers-input"
          type="number"
          max={10}
          value={answerValue !== null ? answerValue : ""}
          onChange={handleAnswerInputChange}
          disabled={!isAnswerEnabled}
        />
      <ClosedCaption text='Configura o número de respostas que o chat vai te retornar' />
    </div>
  );
};

export default NumberAnswers;
