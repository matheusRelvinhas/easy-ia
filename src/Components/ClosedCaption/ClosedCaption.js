import React from "react";
import './ClosedCaption.css';

const ClosedCaption = ({text}) => {
    
  return (
    <span className="tooltip">
      {text}
    </span>
  );
};

export default ClosedCaption;
