import { useEffect } from "react";

import { GamepadsProvider } from "contexts/GamepadsContext";
import Development from "components/utils/Development";

import * as appActions from "store/apps/actions";
import useActions from "hooks/useActions";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

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
      <Development>
        <Router>
          <Switch>
            {routes.map((route) => (
              <Route exact path={route.path}>
                <route.component />
              </Route>
            ))}
          </Switch>
        </Router>
      </Development>
    </GamepadsProvider>
  );
};

export default App;
