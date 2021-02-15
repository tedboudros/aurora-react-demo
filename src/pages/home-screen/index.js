import React, { useState } from "react";
import AppSlider from "components/home-page/AppSlider";

import Button from "components/general/Button";

import * as appActions from "store/apps/actions";

import useActions from "hooks/useActions";
import useInterval from "hooks/useInterval";
import usePrevious from "hooks/usePrevious";

import {
  selectIsAppLoading,
  selectAreAppsFetching,
  selectActiveApp,
} from "store/apps/selectors";
import { useSelector } from "react-redux";

import { List, GameController, Settings } from "assets/icons";

import HomeHeader from "./header";
import DetailsModal from "./details-modal";
import StartMenu from "./start-menu";

import useSoundEffect from "hooks/useSoundEffect";
import Loader from "components/general/Loader";

import _get from "lodash/get";

import { useHistory } from "react-router-dom";

import routes from "routes";

const HomeScreen = () => {
  const playAppStartSound = useSoundEffect("appStart");
  const history = useHistory();

  const [isAppRunning, setIsAppRunning] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const [startSteamGame, setIsAppLoading] = useActions([
    appActions.startSteamGame,
    appActions.setIsAppLoading,
  ]);

  const isAppLoading = useSelector(selectIsAppLoading);
  const areAppsFetching = useSelector(selectAreAppsFetching);
  const activeApp = useSelector(selectActiveApp);

  // const prevIsAppRunning = usePrevious(isAppRunning);

  const apps = routes.filter((route) => route.isApp);

  useInterval(
    async () => {
      if (!activeApp || !activeApp.id) return;

      const isRunning = await appActions.checkIfGameIsRunning(activeApp.id);
      setIsAppRunning(isRunning);

      if (isRunning) {
        setTimeout(() => {
          setIsAppLoading(false);
        }, 5000);
      }

      if (isAppRunning && !isRunning) {
        console.log("app was open and closed just now.");
      }
    },
    !isAppLoading ? null : 5000
  );

  const onPressStart = () => {
    const { steamAppID, isApp, path } = activeApp;
    if (isApp) {
      history.push(path);
    } else {
      startSteamGame(steamAppID);
      setIsAppLoading(true);
    }
    playAppStartSound();
  };

  const goBack = () => {
    setIsAppLoading(false);
  };

  const isLoading = isAppLoading || areAppsFetching;

  return (
    <div className="home-screen">
      <Loader isLoading={isLoading} canGoBack={isAppLoading} goBack={goBack} />
      <div className="home-screen__background--container">
        <div className="auroral-northern-intense" />
        <div className="auroral-stars"></div>
        <div className="home-screen__background"></div>
      </div>
      <HomeHeader />
      <AppSlider stockApps={apps} />
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
          <div className="game-title">{_get(activeApp, "name") || "-"}</div>
        </div>
        <div className="d-flex align-items-center">
          {activeApp.id ? (
            <Button
              text="Details"
              Icon={List}
              button="Y"
              className="mr-4"
              onPress={() => setIsDetailsModalOpen(!isDetailsModalOpen)}
            />
          ) : null}
          <Button
            text="Menu"
            Icon={Settings}
            button="start"
            onPress={() => setIsStartMenuOpen(!isStartMenuOpen)}
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
