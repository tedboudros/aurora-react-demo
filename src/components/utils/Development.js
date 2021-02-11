import { useEffect } from "react";
import useGamepadButton from "hooks/useGamepadButton";

import { useSelector } from "react-redux";
import { selectIsDev } from "store/apps/selectors";

const Development = ({ children }) => {
  useEffect(() => {
    document.title = `Aurora v${process.env.REACT_APP_AURORA_VERSION}`;
  }, []);

  const isDev = useSelector(selectIsDev);

  useGamepadButton(
    {
      8: {
        onButtonDown: () => {
          if (isDev) document.location.reload();
        },
      },
    },
    "always"
  );

  return children;
};

export default Development;
