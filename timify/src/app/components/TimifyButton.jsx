import React from "react";
import './componentsCSS/TimifyButton.css';

const TimifyButton = () => {
  return (
    <button className="timify-button">
      <img src="/icon.png" alt="Icon" className="button-icon" />
      Timify
    </button>
  );
}

export default TimifyButton;
