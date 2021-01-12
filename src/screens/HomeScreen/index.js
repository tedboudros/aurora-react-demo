import React, { useEffect } from "react";

import GameTitle from "components/home-page/GameTitle";
import GameSlider from "components/home-page/GameSlider";

import * as homeActions from "store/home/actions";
import useActions from "hooks/useActions";

import { selectIsHomeLoading } from "store/home/selectors";
import { useSelector } from "react-redux";

import HomeScreenInputs from "./HomeScreen.inputs";

const HomeScreen = () => {
  const [getSteamGames] = useActions([homeActions.getSteamGames]);

  const isLoading = useSelector(selectIsHomeLoading);

  useEffect(() => {
    getSteamGames();
  }, []);

  return (
    <div className="home-screen">
      <div className="home-screen__background--container">
        <div className="home-screen__background">
          <div className="auroral-agrabah" />
          <div className="auroral-stars"></div>
        </div>
      </div>
      <HomeScreenInputs>
        <GameTitle />
        <GameSlider />
      </HomeScreenInputs>
    </div>
  );
};

export default HomeScreen;
