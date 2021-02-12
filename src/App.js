import { useEffect } from "react";

import { GamepadsProvider } from "contexts/GamepadsContext";
import Development from "components/utils/Development";

import * as appActions from "store/apps/actions";
import useActions from "hooks/useActions";

import { AnimatedSwitch } from "react-router-transition";

import { mapStyles, bounceTransition } from "utils/animation";

import {
  HashRouter as Router,
  Switch,
  Route,
  useLocation,
} from "react-router-dom";

import routes from "routes";

const RouterWrapper = () => {
  const location = useLocation();

  return (
    <Development>
      <AnimatedSwitch
        atEnter={bounceTransition.atEnter}
        atLeave={bounceTransition.atLeave}
        atActive={bounceTransition.atActive}
        mapStyles={mapStyles}
        className="route-wrapper"
        location={location}
      >
        {routes.map((route) => (
          <Route exact={route.isExact} path={route.path} key={route.path}>
            <route.component />
          </Route>
        ))}
      </AnimatedSwitch>
    </Development>
  );
};

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
        <Switch>
          <Route path="*">
            <RouterWrapper />
          </Route>
        </Switch>
      </Router>
    </GamepadsProvider>
  );
};

export default App;
