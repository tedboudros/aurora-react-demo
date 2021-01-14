const makeType = (type) => {
  return {
    [type]: {
      REQ: `REQ_${type}`,
      RES: `RES_${type}`,
    },
  };
};

module.exports = {
  ...makeType("START_STEAM_GAME"),
  ...makeType("GET_STEAM_GAMES"),
};
