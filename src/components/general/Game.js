import React from "react";

const Game = ({ isActive = false, game }) => {
  return (
    <div className="game--container">
      <div className={`game ${isActive ? " active" : ""}`}></div>
    </div>
  );
};

export default Game;
