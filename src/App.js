import HomeScreen from "screens/HomeScreen";
import { GamepadsProvider } from "contexts/GamepadsContext";
import { Container } from "@inlet/react-pixi";
import Development from "components/utils/Development";

const App = () => {
  return (
    <GamepadsProvider>
      <Development>
        <Container>
          <HomeScreen />
        </Container>
      </Development>
    </GamepadsProvider>
  );
};

export default App;
