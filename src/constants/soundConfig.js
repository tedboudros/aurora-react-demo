import tap from "assets/sounds/tap.mp3";
import appStart from "assets/sounds/appStart.mp3";
import buttonDown from "assets/sounds/buttonClick.mp3";

export default {
  tap: {
    volume: 0.2,
    sprite: { tap: [0, 250] },
    file: tap,
  },
  appStart: {
    file: appStart,
    volume: 0.7,
  },
  buttonDown: {
    file: buttonDown,
    volume: 0.3,
  },
};
