import convertSize from "convert-size";

export default (game) => ({
  sizeOnDisk: {
    title: "Size on disk",
    value: convertSize(Number(game.SizeOnDisk), "GB", {
      stringify: true,
      accuracy: 2,
    }),
  },
});
