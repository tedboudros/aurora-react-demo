import React from "react";

import { IoIosArrowDown } from "react-icons/io";

const Game = ({ isActive = false, game }) => {
  return (
    <div className="game--container">
      <div
        className={`game ${isActive ? " active" : ""}`}
        style={{ backgroundImage: `url(${game.icon})` }}
      >
        {isActive ? <IoIosArrowDown size={24} className="game--arrow" /> : null}
      </div>
    </div>
  );
};

export default Game;
