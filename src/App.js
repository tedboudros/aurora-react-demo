import HomeScreen from "screens/HomeScreen";
import { GamepadsProvider } from "contexts/GamepadsContext";
import Development from "components/utils/Development";

const App = () => {
  return (
    <GamepadsProvider>
      <Development>
        <HomeScreen />
      </Development>
    </GamepadsProvider>
  );
};

export default App;
