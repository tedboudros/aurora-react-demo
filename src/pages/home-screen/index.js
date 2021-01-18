import React, { useState } from "react";

import GameTitle from "components/home-page/GameTitle";
import GameSlider from "components/home-page/game-slider";

import Button from "components/general/Button";

import * as homeActions from "store/home/actions";
import useActions from "hooks/useActions";

import {
  selectIsHomeLoading,
  selectActiveGame,
  selectSteamGames,
} from "store/home/selectors";
import { useSelector } from "react-redux";

import { IoGameController, IoCog } from "react-icons/io5";
import { FiList } from "react-icons/fi";

import HomeHeader from "./header";
import DetailsModal from "./details-modal";

const HomeScreen = () => {
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [startSteamGame] = useActions([homeActions.startSteamGame]);

  const isLoading = useSelector(selectIsHomeLoading);
  const games = useSelector(selectSteamGames);
  const activeGame = useSelector(selectActiveGame);

  const onPressStart = () => {
    const { appid } = activeGame;
    console.log("down");
    startSteamGame(appid);
  };

  return (
    <div className="home-screen">
      <div className="home-screen__background--container">
        <div className="home-screen__background">
          <div className="auroral-agrabah" />
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
            Icon={IoGameController}
            className="mr-4"
          />
          <GameTitle />
        </div>
        <div className="d-flex align-items-center">
          <Button text="options" Icon={IoCog} button="X" className="mr-4" />
          <Button
            text="details"
            Icon={FiList}
            button="Y"
            onPress={() => setIsDetailsModalOpen(true)}
          />
        </div>
        <DetailsModal
          isOpen={isDetailsModalOpen}
          setIsOpen={setIsDetailsModalOpen}
        />
      </div>
    </div>
  );
};

export default HomeScreen;
