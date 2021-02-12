import React, { useState } from "react";

import GameTitle from "components/home-page/GameTitle";
import GameSlider from "components/home-page/game-slider";

import Button from "components/general/Button";

import * as appActions from "store/apps/actions";
import useActions from "hooks/useActions";

import {
  selectIsAppLoading,
  selectAreAppsFetching,
  selectActiveGame,
} from "store/apps/selectors";
import { useSelector } from "react-redux";

import { List, GameController, Settings } from "assets/icons";

import HomeHeader from "./header";
import DetailsModal from "./details-modal";
import StartMenu from "./start-menu";

import useSoundEffect from "hooks/useSoundEffect";
import Loader from "components/general/Loader";

import { useHistory } from "react-router-dom";

const HomeScreen = () => {
  const playAppStartSound = useSoundEffect("appStart");
  const history = useHistory();

  const [stateInterval, setStateInterval] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const [startSteamGame, setIsAppLoading] = useActions([
    appActions.startSteamGame,
    appActions.setIsAppLoading,
  ]);

  const isAppLoading = useSelector(selectIsAppLoading);
  const areAppsFetching = useSelector(selectAreAppsFetching);
  const activeGame = useSelector(selectActiveGame);

  const onPressStart = () => {
    const { steamAppID } = activeGame;
    //startSteamGame(steamAppID);
    playAppStartSound();
    setIsAppLoading(true);

    const interval = setInterval(async () => {
      const isRunning = await appActions.checkIfGameIsRunning(activeGame.id);

      if (isRunning) {
        clearInterval(interval);
        setTimeout(() => {
          setIsAppLoading(false);
        }, 5000);
      }
    }, 5000);

    setStateInterval(interval);
  };

  const goBack = () => {
    setIsAppLoading(false);
    clearInterval(stateInterval);
  };

  const isLoading = isAppLoading || areAppsFetching;

  return (
    <div className="home-screen">
      <Loader isLoading={isLoading} canGoBack={isAppLoading} goBack={goBack} />
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
            text="Start"
            button="A"
            Icon={GameController}
            isSoundDisabled
            className="mr-4"
          />
          <GameTitle />
        </div>
        <div className="d-flex align-items-center">
          <Button
            text="Menu"
            Icon={Settings}
            button="start"
            className="mr-4"
            onPress={() => setIsStartMenuOpen(!isStartMenuOpen)}
          />
          <Button
            text="Details"
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
