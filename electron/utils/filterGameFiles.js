const path = require("path");

const filterGameFiles = (files) => {
  return files.filter((filePath) => {
    const file = path.basename(filePath);

    const lowercaseFile = file.toLowerCase();

    const containsInstall = lowercaseFile.includes("install");
    const containsSetup = lowercaseFile.includes("setup");
    const containsUnityCrashHandler = lowercaseFile.includes(
      "unitycrashhandler"
    );
    const containsUnrealCEFSubProcess = lowercaseFile.includes(
      "unrealcefsubprocess"
    );

    return !(
      containsInstall ||
      containsSetup ||
      containsUnityCrashHandler ||
      containsUnrealCEFSubProcess
    );
  });
};

module.exports = filterGameFiles;
