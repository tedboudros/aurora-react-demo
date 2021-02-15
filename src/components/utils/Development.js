import { useEffect } from "react";
import useGamepadButton from "hooks/useGamepadButton";

import { useSelector } from "react-redux";
import { selectIsDev } from "store/apps/selectors";
import { useHistory } from "react-router-dom";

const Development = ({ children }) => {
  const history = useHistory();

  useEffect(() => {
    document.title = `Aurora v${process.env.REACT_APP_AURORA_VERSION}`;
  }, []);

  const isDev = useSelector(selectIsDev);

  useGamepadButton(
    {
      8: {
        onButtonDown: () => {
          if (isDev) {
            history.push("/welcome");
            // document.location.reload();
          }
        },
      },
    },
    "always"
  );

  return children;
};

export default Development;
