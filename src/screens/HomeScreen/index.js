import React, { useEffect } from "react";

import Game from "components/general/Game";
import GameTitle from "components/home-page/GameTitle";

import * as homeActions from "store/home/actions";
import useActions from "hooks/useActions";

import {
  selectIsHomeLoading,
  selectSteamGames,
  selectActiveGameIndex,
} from "store/home/selectors";
import { useSelector } from "react-redux";

import HomeScreenInputs from "./HomeScreen.inputs";

const HomeScreen = () => {
  const [getSteamGames] = useActions([homeActions.getSteamGames]);

  const activeGame = useSelector(selectActiveGameIndex);
  const games = useSelector(selectSteamGames);
  const isLoading = useSelector(selectIsHomeLoading);

  useEffect(() => {
    getSteamGames();
  }, []);

  return (
    <div className="home-screen">
      <GameTitle />
      <div
        className="home-screen__menu"
        style={{ transform: `translateX(-${activeGame * 10}rem)` }}
      >
        <HomeScreenInputs>
          {games.map((game, i) => (
            <Game game={game} isActive={i === activeGame} />
          ))}
        </HomeScreenInputs>
      </div>
    </div>
  );
};

export default HomeScreen;
