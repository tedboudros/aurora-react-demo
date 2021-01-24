import _isObject from "lodash/isObject";
import _get from "lodash/get";

export const shouldRegisterIndividual = (behaviour, isDrawerOpen) => {
  switch (behaviour) {
    case "drawer":
      return isDrawerOpen;
    case "always":
      return true;

    case "default":
    default:
      return !isDrawerOpen;
  }
};

export const shouldRegister = (behaviour, button, isDrawerOpen, isLoading) => {
  let isValid;

  if (_isObject(behaviour) && button) {
    if (_get(behaviour, button))
      isValid = shouldRegisterIndividual(
        behaviour[button],
        isDrawerOpen,
        isLoading
      );
  } else {
    isValid = shouldRegisterIndividual(behaviour, isDrawerOpen, isLoading);
  }

  return isLoading ? false : isValid;
};
