import { useState, useEffect } from "react";

const useUpdateWindowDimensions = (log = false) => {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  const updateWindowDimensions = () => {
    if (log)
      console.log(
        "%cLOG: Updating window dimensions",
        "color:#08c;background:#123;padding:3px 6px;border-radius:8px"
      );
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  useEffect(() => {
    updateWindowDimensions();
    window.addEventListener("resize", updateWindowDimensions);
    return () => {
      window.removeEventListener("resize", updateWindowDimensions);
    };
  }, []);

  return { width, height };
};

export default useUpdateWindowDimensions;
