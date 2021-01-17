import convertSize from "convert-size";

import _get from "lodash/get";

export default (game) => ({
  name: {
    title: "Name",
    value: game.name,
  },
  sizeOnDisk: {
    title: "Size on disk",
    value: convertSize(Number(game.SizeOnDisk), "GB", {
      stringify: true,
      accuracy: 2,
    }),
  },
  language: {
    title: "Language",
    value: _get(game, "UserConfig.language", null),
    className: "text-capitalize",
  },
});
