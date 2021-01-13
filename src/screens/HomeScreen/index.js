import React, { useEffect, useState } from "react";

import GameTitle from "components/home-page/GameTitle";
import GameSlider from "components/home-page/GameSlider";

import Button from "components/general/Button";

import * as homeActions from "store/home/actions";
import useActions from "hooks/useActions";

import { selectIsHomeLoading } from "store/home/selectors";
import { useSelector } from "react-redux";

import HomeScreenInputs from "./HomeScreen.inputs";

import { IoGameController, IoCog } from "react-icons/io5";

const HomeScreen = () => {
  const [isAButtonDown, setIsAButtonDown] = useState(false);
  const [isBButtonDown, setIsBButtonDown] = useState(false);
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
      <div className="home-screen__buttons">
        <Button
          isPressed={isAButtonDown}
          text="start"
          button="A"
          Icon={IoGameController}
        />
        <Button
          isPressed={isBButtonDown}
          text="options"
          Icon={IoCog}
          button="B"
          className="ml-2"
        />
      </div>
      <HomeScreenInputs
        setIsAButtonDown={setIsAButtonDown}
        setIsBButtonDown={setIsBButtonDown}
      >
        <GameTitle />
        <GameSlider />
      </HomeScreenInputs>
    </div>
  );
};

export default HomeScreen;
