import Matter, { World } from "matter-js";
import config from "../Config";

const worldWidth = 900;
// const worldHeight = 850;
// const startPins = 5;
const maxPins = 30;
const numlines = 20;
// const pinSize = 5;
const pinGap = 30;
const marginTop = 150;
// const floorHeight = 20;
// const ballElastity = 0.9;
const barsSectionWidth = worldWidth - 100;
const barWidth = 3;

const ballConfig = {
  x: worldWidth / 2 - (maxPins * pinGap) / 2 + (maxPins / 2) * pinGap,
  y: marginTop,
  ballSize: 3,
};

const generateBars = (color = "white", numContainers = 7) => {
  const totalWidth = window.innerWidth;
  const numBars = numContainers + 1;
  const containers = Array(numContainers)
    .fill()
    .map((_, index) => index);
  const bars = Array(numBars)
    .fill()
    .map((_, index) => index);

  const containerWidth = (totalWidth - numBars * barWidth) / numContainers;
  const containerWidths = containers.map((_, idx) => {
    return { index: idx, width: containerWidth };
  });

  const newContainerWidths = [];
  containerWidths.reduce((accWidth, curWidth, curWidthIdx) => {
    const newAccWidth = curWidth.width + accWidth;
    const newWidth = { ...curWidth, width: newAccWidth };
    newContainerWidths.push({ ...newWidth });
    return newAccWidth;
  }, 0);

  // const startPosition = worldWidth / 2 - (maxPins * pinGap) / 2 + pinGap;
  const startPosition = 0;
  const posts = [];

  for (let i = 0; i < bars.length; i++) {
    const barIdx = i;
    const x = startPosition + barIdx * (barWidth + containerWidth);
    const y = marginTop + numlines * ballConfig.ballSize + (numlines - 1) * pinGap;
    const post = Matter.Bodies.rectangle(x, y, barWidth, 100, {
      isStatic: true,
      render: {
        fillStyle: color,
      },
    });
    posts.push(post);
  }

  return posts;
};

export default generateBars;
