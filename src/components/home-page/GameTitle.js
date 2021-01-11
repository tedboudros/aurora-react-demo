import React from "react";

import { selectActiveGameTitle } from "store/home/selectors";

import { useSelector } from "react-redux";

const GameTitle = () => {
  const gameTitle = useSelector(selectActiveGameTitle);

  return <div className="game-title">{gameTitle}</div>;
};

export default GameTitle;
