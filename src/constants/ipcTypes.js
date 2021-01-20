const makeType = (type) => {
  return {
    [type]: {
      REQ: `REQ_${type}`,
      RES: `RES_${type}`,
    },
  };
};

export default {
  ...makeType("START_STEAM_GAME"),
  ...makeType("GET_STEAM_GAMES"),
  ...makeType("GET_IS_DEV"),
  ...makeType("QUIT_APP"),
  ...makeType("TOGGLE_FULLSCREEN"),
};
