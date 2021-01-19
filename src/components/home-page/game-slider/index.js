import React from "react";

import Game from "components/general/Game";

import { selectActiveGameIndex, selectSteamGames } from "store/home/selectors";

import { useSelector } from "react-redux";

import Inputs from "./Inputs";

const GameSlider = () => {
  const games = useSelector(selectSteamGames);
  const activeGame = useSelector(selectActiveGameIndex);

  return (
    <Inputs>
      <div className="game-slider">
        <div
          className="game-slider__menu"
          style={{ transform: `translateX(-${activeGame * 9.5}rem)` }}
        >
          {games.map((game, i) => (
            <Game key={i} game={game} isActive={i === activeGame} />
          ))}
        </div>
      </div>
    </Inputs>
  );
};

export default GameSlider;
