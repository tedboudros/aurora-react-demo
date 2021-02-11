import { useEffect } from "react";

import HomeScreen from "pages/home-screen";
import { GamepadsProvider } from "contexts/GamepadsContext";
import Development from "components/utils/Development";

import * as appActions from "store/apps/actions";
import useActions from "hooks/useActions";

const App = () => {
  const [getSteamGames, getIsDev] = useActions([
    appActions.getSteamGames,
    appActions.getIsDev,
  ]);

  useEffect(() => {
    getSteamGames();
    getIsDev();
  }, []);

  return (
    <GamepadsProvider>
      <Development>
        <HomeScreen />
      </Development>
    </GamepadsProvider>
  );
};

export default App;
