import React from "react";

const Game = ({ isActive = false, game }) => {
  return (
    <div className="game--container">
      <div
        className={`game ${isActive ? " active" : ""}`}
        style={{ backgroundImage: `url(${game.icon})` }}
      ></div>
    </div>
  );
};

export default Game;
