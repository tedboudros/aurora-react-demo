import _isObject from "lodash/isObject";
import _get from "lodash/get";

import { useSelector } from "react-redux";
import { selectIsDrawerOpen } from "store/drawer/selectors";
import { selectIsHomeLoading } from "store/apps/selectors";

const useShouldRegister = () => {
  const isDrawerOpen = useSelector(selectIsDrawerOpen);
  const isHomeLoading = useSelector(selectIsHomeLoading);

  const shouldRegisterSingle = (behaviour) => {
    switch (behaviour) {
      case "drawer":
        return isDrawerOpen;

      case "always":
        return true;

      case "loader":
        return isHomeLoading;

      case "default":
      default:
        return !isDrawerOpen && !isHomeLoading;
    }
  };

  const shouldRegister = (behaviour, button) => {
    if (_isObject(behaviour) && button) {
      if (_get(behaviour, button)) {
        return shouldRegisterSingle(behaviour[button]);
      }
    } else {
      return shouldRegisterSingle(behaviour);
    }
  };

  return shouldRegister;
};

export default useShouldRegister;
