import React from "react";
import ColorSplash from "./components/ColorSplash";
import Confetti from "react-confetti";

const App = () => {
  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center">
      <ColorSplash />
      <Confetti numberOfPieces={100} recycle={false} />
    </div>
  );
};

export default App;
