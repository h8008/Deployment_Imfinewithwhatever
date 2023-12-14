import Matter from "matter-js";
import { useMemo } from "react";
import config from "../Config/index";
const { worldWidth, maxPins, pinGap, marginTop } = config;

const ballConfig = {
  x: worldWidth / 2 - (maxPins * pinGap) / 2 + (maxPins / 2) * pinGap,
  y: marginTop,
  ballSize: 3,
  ballElastity: 0.9,
};

const useInitialBall = () => {
  const ball = useMemo(
    () =>
      Matter.Bodies.circle(ballConfig.x, ballConfig.y, ballConfig.ballSize, {
        restitution: ballConfig.ballElastity,
        render: {
          fillStyle: "white",
        },
      }),
    []
  );
  return ball;
};

export default useInitialBall;
