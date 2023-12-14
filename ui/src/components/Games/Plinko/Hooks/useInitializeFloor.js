import config from "../Config";
import { useMemo, useEffect } from "react";
import { Bodies } from "matter-js";

// const pinGap = config.pinGap;
// const offset = pinGap / 2;
// const linePins = config.startPins + config.numlines - 1;
// const lineWidth = linePins * pinGap;
// const floorWidthRightBound = offset + config.worldWidth / 2 - lineWidth / 2 + linePins * pinGap;
// const floorWidthLeftBound = offset + config.worldWidth / 2 - lineWidth / 2;

// console.log("lineWidth", lineWidth);

const useInitializeFloor = (numContainers, context) => {
  const worldHeight = config.worldHeight;
  const floorHeight = config.floorHeight;
  const floorWidth = window.innerWidth;

  return useMemo(
    () =>
      Bodies.rectangle(0, worldHeight - floorHeight, floorWidth, floorHeight, {
        isStatic: true,
        render: {
          fillStyle: "white",
        },
      }),
    [floorHeight, floorWidth, worldHeight]
  );
};

export default useInitializeFloor;
