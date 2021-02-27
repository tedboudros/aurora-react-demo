import { useEffect, useState } from "react";

import { GamepadsProvider } from "contexts/GamepadsContext";
import Development from "components/utils/Development";

import * as appActions from "store/apps/actions";
import useActions from "hooks/useActions";

import { CSSTransition } from "react-transition-group";
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
        {routes.map((route) => (
          <Route exact={route.isExact} path={route.path} key={route.path}>
            {({ match }) => (
              <CSSTransition
                in={match != null}
                timeout={300}
                classNames="page"
                unmountOnExit
              >
                <div className="page">
                  <Development>
                    <route.component />
                  </Development>
                </div>
              </CSSTransition>
            )}
          </Route>
        ))}
      </Router>
    </GamepadsProvider>
  );
};

export default App;
