import React from "react";
import './Error.css';

const Error = ({text}) => {
    
  return (
    <div className="container-error div-shadow">
      {text}
    </div>
  );
};

export default Error;
