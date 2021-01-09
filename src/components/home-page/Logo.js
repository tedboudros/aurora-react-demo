import React from "react";
import Text from "components/general/Text";

const Logo = () => {
  return (
    <>
      <Text
        anchor={{ x: 1, y: 0 }}
        y={-10}
        x={-38}
        text={"aurora"}
        textStyle={{ fill: "#fff", fontSize: 44, fontWeight: 300 }}
      />
      <Text
        anchor={{ x: 1, y: 0 }}
        y={16}
        text={"alpha"}
        textStyle={{ fill: "#ccc", fontSize: 14, fontWeight: 400 }}
      />
    </>
  );
};

export default Logo;
