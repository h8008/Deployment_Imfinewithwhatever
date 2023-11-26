import icons from "../../icons/foods";
import { useRef, useEffect, forwardRef } from "react";

const getIcons = (iconPackage) => {
  return iconPackage.map((p) => {
    const Comp = p;
    return <Comp color={"black"} width={"50px"} height={"50px"} />;
  });
};

const RandomPositions = (props) => {
  return <></>;
};

export default RandomPositions;
