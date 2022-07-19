import { useState } from "react";
import "./App.css";
import { Home } from "./components/Home";

function App() {
  const [isLoding, setIsLoding] = useState(true);
  setTimeout(() => {
    setIsLoding(false);
  }, 3000);
  return (
    <div className="main">
      {isLoding ? (
        <div id="loading">
          <div id="main">
            <div id="left"></div>
            <div id="right"></div>
          </div>
        </div>
      ) : (
        ""
      )}
      <Home />
    </div>
  );
}

export default App;
