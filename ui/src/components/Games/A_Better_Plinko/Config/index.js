const config = {
  worldWidth: 1000,
  worldHeight: 850,
  startPins: 5,
  maxPins: 30,
  numlines: 20,
  pinSize: 5,
  pinGap: 30,
  marginTop: 150,
  floorHeight: 20,
  ballElastity: 0.9,
  barsSectionWidth: 900 - 100,
  barWidth: 10,
  bucketSize: 250,
};

const pegsConfig = {
  rows: 20,
  cols: 6,
  r: 5,
  color: "green",
};

const ballConfig = {
  x: config.worldWidth / 2 - (config.maxPins * config.pinGap) / 2 + (config.maxPins / 2) * config.pinGap,
  y: config.marginTop,
  r: 15,
  ballElastity: 0.9,
};

export { config, ballConfig, pegsConfig };
