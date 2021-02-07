import React, { useState } from "react";

import GameTitle from "components/home-page/GameTitle";
import GameSlider from "components/home-page/game-slider";

import Button from "components/general/Button";

import * as homeActions from "store/home/actions";
import useActions from "hooks/useActions";

import {
  selectIsHomeLoading,
  selectActiveGame,
  //selectSteamGames,
} from "store/home/selectors";
import { useSelector } from "react-redux";

import { List, GameController, Settings } from "assets/icons";

import HomeHeader from "./header";
import DetailsModal from "./details-modal";
import StartMenu from "./start-menu";

import useSoundEffect from "hooks/useSoundEffect";

import Loader from "components/general/Loader";

const HomeScreen = () => {
  const playAppStartSound = useSoundEffect("appStart");

  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const [startSteamGame, setIsHomeLoading] = useActions([
    homeActions.startSteamGame,
    homeActions.setIsHomeLoading,
  ]);

  const isLoadingHome = useSelector(selectIsHomeLoading);
  const activeGame = useSelector(selectActiveGame);

  const onPressStart = () => {
    const { steamAppID } = activeGame;
    startSteamGame(steamAppID);
    playAppStartSound();
    setIsHomeLoading(true);

    const interval = setInterval(async () => {
      const isRunning = await homeActions.checkIfGameIsRunning(activeGame.id);

      if (isRunning) {
        clearInterval(interval);
        setTimeout(() => {
          setIsHomeLoading(false);
        }, 5000);
      }
    }, 5000);
  };

  const isLoading = isLoadingHome;

  return (
    <div className="home-screen">
      <Loader isLoading={isLoading} />
      <div className="home-screen__background--container">
        <div className="home-screen__background">
          <div className="auroral-agraba" />
          <div className="auroral-stars"></div>
        </div>
      </div>
      <HomeHeader />
      <GameSlider />
      <div className="home-screen__buttons">
        <div className="d-flex align-items-center">
          <Button
            onPress={onPressStart}
            text="start"
            button="A"
            Icon={GameController}
            isSoundDisabled
            className="mr-4"
          />
          <GameTitle />
        </div>
        <div className="d-flex align-items-center">
          <Button
            text="menu"
            Icon={Settings}
            button="start"
            className="mr-4"
            onPress={() => setIsStartMenuOpen(!isStartMenuOpen)}
          />
          <Button
            text="details"
            Icon={List}
            button="Y"
            onPress={() => setIsDetailsModalOpen(!isDetailsModalOpen)}
          />
        </div>
        <DetailsModal
          isOpen={isDetailsModalOpen}
          setIsOpen={setIsDetailsModalOpen}
        />
        <StartMenu isOpen={isStartMenuOpen} setIsOpen={setIsStartMenuOpen} />
      </div>
    </div>
  );
};

export default HomeScreen;
