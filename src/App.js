import { useEffect, useState } from "react";

import { GamepadsProvider } from "contexts/GamepadsContext";
import Development from "components/utils/Development";

import * as appActions from "store/apps/actions";
import useActions from "hooks/useActions";

import { AnimatedSwitch } from "react-router-transition";

import { mapStyles, bounceTransition } from "utils/animation";

import { HashRouter as Router, Route } from "react-router-dom";

import routes from "routes";

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
      <Router>
        <AnimatedSwitch
          atEnter={bounceTransition.atEnter}
          atLeave={bounceTransition.atLeave}
          atActive={bounceTransition.atActive}
          mapStyles={mapStyles}
          className="route-wrapper"
        >
          {routes.map((route) => (
            <Route exact={route.isExact} path={route.path} key={route.path}>
              <div className="page">
                <Development>
                  <route.component />
                </Development>
              </div>
            </Route>
          ))}
        </AnimatedSwitch>
      </Router>
    </GamepadsProvider>
  );
};

export default App;
