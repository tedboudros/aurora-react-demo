import * as colors from "assets/styles/colors";

const box = [
  {
    width: 190,
    height: 190,
    y: -70,
    name: "boxBig",
  },
];

const boxBorder = [{ name: "active" }]; //borderColor: colors.active, name: "active" }];

const gameTitle = [
  { name: "gameTitleShown", alpha: 1 },
  { name: "gameTitleHiddenLeft", alpha: 0.6 },
  { name: "gameTitleHiddenRight", alpha: 0.6 },
];

const blur = [
  { name: "blurred", blur: 3 },
  { name: "default", blur: 0 },
];

export default {
  box,
  boxBorder,
  gameTitle,
  blur,
};
