import _isObject from "lodash/isObject";
import _get from "lodash/get";

import { useSelector } from "react-redux";
import { selectIsDrawerOpen } from "store/drawer/selectors";
import {
  selectIsAppLoading,
  selectAreAppsFetching,
} from "store/apps/selectors";

const useShouldRegister = () => {
  const isDrawerOpen = useSelector(selectIsDrawerOpen);

  const isAppLoading = useSelector(selectIsAppLoading);
  const areAppsFetching = useSelector(selectAreAppsFetching);

  const isLoading = isAppLoading || areAppsFetching;

  const shouldRegisterSingle = (behaviour) => {
    switch (behaviour) {
      case "drawer":
        return isDrawerOpen;

      case "always":
        return true;

      case "loader":
        return isLoading;

      case "default":
      default:
        return !isDrawerOpen && !isLoading;
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
