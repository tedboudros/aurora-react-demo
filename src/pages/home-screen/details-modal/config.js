import convertSize from "convert-size";

import _get from "lodash/get";

export default (game) => {
  if (!game) return;

  return {
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
    platform: { title: "Platform", value: game.platform },
    installedDrive: {
      title: "Installed on drive",
      value: `${_get(game, "steamGamesDir", "").split(":")[0]}:`,
    },
  };
};
