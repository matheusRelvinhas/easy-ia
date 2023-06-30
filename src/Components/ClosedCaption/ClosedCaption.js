import React from "react";
import './ClosedCaption.css';

const ClosedCaption = ({text}) => {
    
  return (
    <span className="tooltip div-shadow">
      {text}
    </span>
  );
};

export default ClosedCaption;
