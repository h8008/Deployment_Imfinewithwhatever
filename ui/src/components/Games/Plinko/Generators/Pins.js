import Matter, { World } from "matter-js";

const worldWidth = 900;
const startPins = 5;
const numlines = 20;
const pinSize = 5;
const pinGap = 30;

const generatePins = (color) => {
  const lines = Array(numlines)
    .fill()
    .map((_, index) => index);
  const pins = [];

  for (let i = 0; i < lines.length; i++) {
    const lineIdx = i;
    const linePins = startPins + lineIdx;
    const lineWidth = linePins * pinGap;

    const row = Array(linePins)
      .fill()
      .map((_, index) => index);

    for (let j = 0; j < row.length; i++) {
      const pinIdx = j;
      const offset = pinGap;
      const x = offset + worldWidth / 2 - lineWidth / 2 + pinIdx * pinGap;
      const y = 100 + lineIdx * pinGap;

      const pin = Matter.Bodies.circle(x, y, pinSize, {
        isStatic: true,
        render: {
          fillStyle: color,
        },
      });
      pins.push(pin);
    }
  }

  return pins;

  // return await Promise.all(promises).reduce((flattened, line, lineIdx) => {
  //   flattened = flattened.concat(line);
  //   return flattened;
  // }, []);
};
// const generatePins = async (color) => {
//   const lines = Array(numlines)
//     .fill()
//     .map((_, index) => index);
//   const promises = lines.map(async (lineLength, lineIdx) => {
//     const linePins = startPins + lineIdx;
//     const lineWidth = linePins * pinGap;

//     const row = Array(linePins)
//       .fill()
//       .map((_, index) => index);

//     const linePromises = await row.map(async (pin, pinIdx) => {
//       const offset = pinGap / 2;
//       const x = offset + worldWidth / 2 - lineWidth / 2 + pinIdx * pinGap;
//       const y = 100 + lineIdx * pinGap;

//       return Matter.Bodies.circle(x, y, pinSize, {
//         isStatic: true,
//         render: {
//           fillStyle: color,
//         },
//       });
//     });
//     const line = await Promise.all(linePromises);
//     console.log("line length", line.length);
//     return line;
//   });

//   return await Promise.all(promises).reduce((flattened, line, lineIdx) => {
//     flattened = flattened.concat(line);
//     return flattened;
//   }, []);
// };

export default generatePins;
