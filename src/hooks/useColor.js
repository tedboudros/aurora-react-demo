const useColor = (string = "") => {
  if (!string && typeof string !== "string") return null;

  let stringToHexify = "#000";

  if (
    string.includes("#") ||
    string.replace("#", "").length === 3 ||
    string.replace("#", "").length === 6
  ) {
    stringToHexify = string;
  } else {
    return getFromRGB(rgbaToRgb(string));
  }
  return getFromHex(stringToHexify);
};

const componentFromStr = (numStr, percent) => {
  var num = Math.max(0, parseInt(numStr, 10));
  return percent
    ? Math.floor((255 * Math.min(100, num)) / 100)
    : Math.min(255, num);
};

const rgbaToRgb = (rgba) => {
  return `rgb(${rgba
    .replaceAll("rgba(", "")
    .replaceAll(")", "")
    .split(", ")
    .filter((_, i) => _ && i < 3)
    .join(", ")})`;
};

const getFromRGB = (rgb) => {
  var rgbRegex = /^rgb\(\s*(-?\d+)(%?)\s*,\s*(-?\d+)(%?)\s*,\s*(-?\d+)(%?)\s*\)$/;
  var result,
    r,
    g,
    b,
    hex = "";
  if ((result = rgbRegex.exec(rgb))) {
    r = componentFromStr(result[1], result[2]);
    g = componentFromStr(result[3], result[4]);
    b = componentFromStr(result[5], result[6]);

    hex = "0x" + (0x1000000 + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }
  return hex;
};

const getFromHex = (hexString) => {
  const filteredHexString = hexString.replace
    ? hexString.replace("#", "")
    : "000000";

  const serializedHexString =
    filteredHexString.length === 3
      ? `${filteredHexString[0]}${filteredHexString[0]}${filteredHexString[1]}${filteredHexString[1]}${filteredHexString[2]}${filteredHexString[2]}`
      : filteredHexString;

  return `0x${serializedHexString}`;
};

export default useColor;
