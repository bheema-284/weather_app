import React from "react";

import "../styles/Warning.css";

function Warning() {
  return (
    <div className="Warning">
      <h2> No location found </h2>
      <p>Try informing city/town and state/country</p>
      <p> Ex: Metro City</p>
      <p> Ex: Hyderabad, Mumbai </p>
    </div>
  );
}

export default Warning;
