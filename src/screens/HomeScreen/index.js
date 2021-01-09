import React, { useEffect, useState } from "react";

import useAnimation from "hooks/useAnimation";
import useUpdateWindowDimensions from "hooks/useUpdateWindowDimensions";
import useActions from "hooks/useActions";
import useAverageColor from "hooks/useAverageColor";
import { useSelector } from "react-redux";

import {
  selectIsHomeLoading,
  selectSteamGames,
  selectActiveGameIndex,
  selectActiveGameTitle,
} from "store/home/selectors";
import * as homeActions from "store/home/actions";

import Game from "components/home-page/Game";
import Logo from "components/home-page/Logo";
import Loader from "components/general/Loader";
import Container from "components/general/Container";
import Rectangle from "components/general/Rectangle";
import Image from "components/general/Image";

import HomeScreenInputs from "./HomeScreen.inputs";
import homeScreenAnimations from "./HomeScreen.animations";
import homeScreenStyles from "./HomeScreen.styles";

import backgroundOne from "assets/png/backgrounds/1.jpg";

import { filters } from "pixi.js";
import { withFilters } from "@inlet/react-pixi";

import { animated, AnimatedContainer, AnimatedText } from "components/animated";

const Filters = withFilters(Container, {
  blur: filters.BlurFilter,
});

const ContainerWithFilters = animated((props) => {
  const { children } = props;
  const blurAmount = props.blur;
  return <Filters blur={{ blur: blurAmount }}>{children}</Filters>;
});

const HomeScreen = () => {
  const [isLeft, setIsLeft] = useState(false);

  const [getSteamGames] = useActions([homeActions.getSteamGames]);

  const activeGame = useSelector(selectActiveGameIndex);
  const games = useSelector(selectSteamGames);
  const gameTitle = useSelector(selectActiveGameTitle);
  const isLoading = useSelector(selectIsHomeLoading);

  const averageColor = useAverageColor(backgroundOne);
  const colorText = averageColor.isDark ? "#fff" : "#000";

  useEffect(() => {
    getSteamGames();
  }, []);

  useEffect(() => {
    blurAnimation.setAnimation(isLoading ? "blurred" : "default");
  }, [isLoading]);

  const { width, height } = useUpdateWindowDimensions();

  const currentY = height - 160;

  const gameTitleAnimation = useAnimation(
    homeScreenStyles.gameTitle,
    homeScreenAnimations.gameTitle
  );

  const scrollAnimation = useAnimation({ y: currentY, x: 0 }, [], 220);

  const blurAnimation = useAnimation(
    homeScreenStyles.blur,
    homeScreenAnimations.blur
  );

  useEffect(() => {
    scrollAnimation.setAnimation(() => ({
      y: currentY,
    }));
  }, [height]);

  const titleAnimationFunc = () => {
    gameTitleAnimation.setAnimation(
      `gameTitleHidden${isLeft ? "Left" : "Right"}`
    );
    setTimeout(() => {
      gameTitleAnimation.setAnimation("gameTitleShown");
    }, 150);
  };

  useEffect(() => {
    scrollAnimation.setAnimation(() => ({
      x: activeGame * -152,
    }));
    titleAnimationFunc();
  }, [activeGame]);

  return (
    <HomeScreenInputs setIsLeft={setIsLeft}>
      <Container>
        <Filters blur={{ blur: 0 }}>
          <Image image={backgroundOne} width={width} height={height} />
          <Container alpha={0.5}>
            <Rectangle
              borderRadius={12}
              shadowBlur={15}
              shadowColor={"#000"}
              shadowAlpha={0.7}
              background={"#000"}
              x={32}
              y={48}
              width={width - 64}
              height={64}
            />
          </Container>
        </Filters>
        <ContainerWithFilters {...blurAnimation.props}>
          <AnimatedContainer {...scrollAnimation.props}>
            {games.map((game, i) => (
              <Game index={i} key={i} />
            ))}
          </AnimatedContainer>
          <Container x={64} y={64}>
            <AnimatedText
              {...gameTitleAnimation.props}
              text={gameTitle}
              textStyle={{ fill: colorText, fontSize: 30, fontWeight: 400 }}
            />
          </Container>
          {/*
          <Image
            x={width - 110}
            y={64}
            image={logoWide}
            anchor={{ x: 1, y: 0 }}
            roundPixels={true}
            scale={0.082}
          />*/}
          <Container x={width - 64} y={64}>
            <Logo />
          </Container>
        </ContainerWithFilters>

        <Loader isLoading={isLoading} />
      </Container>
    </HomeScreenInputs>
  );
};

export default HomeScreen;
