import React, { useState, useEffect, useRef, useContext } from "react";
import { useTheme } from "@mui/material";
import Matter, { World } from "matter-js";

import { RestaurantsContext } from "../../../providers/RestaurantsProvider";
import { GameContext } from "../../../providers/GameProvider";
import { UPDATE_CUISINE, UPDATE_RESTAURANTS } from "../../../reducer/Main/actions";

import { useNavigate } from "react-router-dom";
import { MessageContext } from "../../../providers/MessageProvider";
import { UPDATE_MESSAGE } from "../../../reducer/Message/MessageAction";

const worldWidth = 900;
const worldHeight = 850;
const startPins = 5;
const maxPins = 30;
const numlines = 20;
const pinSize = 5;
const pinGap = 30;
const marginTop = 150;
const floorHeight = 20;
const ballElastity = 0.9;
const barsSectionWidth = worldWidth - 100;
const barWidth = 3;

const ballConfig = {
  x: worldWidth / 2 - (maxPins * pinGap) / 2 + (maxPins / 2) * pinGap,
  y: marginTop,
  ballSize: 3,
};

const generateBars = async (color, numContainers = 7) => {
  const totalWidth = barsSectionWidth;
  const numBars = numContainers + 1;
  const containers = Array(numContainers)
    .fill()
    .map((_, index) => index);
  const bars = Array(numBars)
    .fill()
    .map((_, index) => index);

  const containerWidth = (totalWidth - numBars * barWidth) / numContainers;
  const containerWidths = containers.map((container, idx) => {
    return { index: idx, width: containerWidth };
  });
  const newContainerWidths = [];
  containerWidths.reduce((accWidth, curWidth, curWidthIdx) => {
    const newAccWidth = curWidth.width + accWidth;
    const newWidth = { ...curWidth, width: newAccWidth };
    newContainerWidths.push({ ...newWidth });
    return newAccWidth;
  }, 0);

  const startPosition = 50;

  const postPromises = bars.map(async (barIdx) => {
    const x = startPosition + barIdx * (barWidth + containerWidth);
    const y = marginTop + numlines * ballConfig.ballSize + (numlines - 1) * pinGap;

    return Matter.Bodies.rectangle(x, y, barWidth, 100, {
      isStatic: true,
      render: {
        fillStyle: "white",
      },
    });
  });

  const posts = await Promise.all(postPromises);

  return posts;
};

const generatePins = async (color) => {
  const lines = Array(numlines)
    .fill()
    .map((_, index) => index);
  const promises = lines.map(async (lineLength, lineIdx) => {
    const linePins = startPins + lineIdx;
    const lineWidth = linePins * pinGap;

    const row = Array(linePins)
      .fill()
      .map((_, index) => index);

    const linePromises = await row.map(async (pin, pinIdx) => {
      const offset = pinGap / 2;
      const x = offset + worldWidth / 2 - lineWidth / 2 + pinIdx * pinGap;
      const y = 100 + lineIdx * pinGap;

      return Matter.Bodies.circle(x, y, pinSize, {
        isStatic: true,
        render: {
          fillStyle: color,
        },
      });
    });
    const line = await Promise.all(linePromises);
    console.log("line length", line.length);
    return line;
  });

  const pins = await Promise.all(promises);
  console.log("pins length", pins.length);

  const pinsFlattened = pins.reduce((flattened, line, lineIdx) => {
    flattened = flattened.concat(line);
    return flattened;
  }, []);

  return pinsFlattened;
};

const mapSlotsToOptions = (optionsData) => {
  const extractNames = (options) => {
    return options.map((option) => option.name);
  };

  const options = extractNames(optionsData);

  if (options == null || options.length === 0) return [];
  const numOptions = options.length;
  const containers = Array(numOptions)
    .fill()
    .map((_, index) => index);

  // Gets the the average width of a container for one option
  const containerWidth = (barsSectionWidth - numOptions * barWidth) / numOptions;

  // Creates an array of widths. Each element in the array is the width
  // of a container that represents an option
  const containerWidths = containers.map((container, idx) => {
    return { index: idx, width: containerWidth };
  });
  // Creates an new array of widths. Each element in the array is the accumulated width
  // of a container from left to right that represents an option
  const newContainerWidths = [];
  containerWidths.reduce((accWidth, curWidth, _) => {
    const newAccWidth = curWidth.width + accWidth;
    const newWidth = { ...curWidth, width: newAccWidth };
    newContainerWidths.push({ ...newWidth });
    return newAccWidth;
  }, 0);

  return newContainerWidths;
};

// Get a list of restaurants as props from MultiDecisionMaker
const Plinko = (props) => {
  const { restaurantDispatch } = useContext(RestaurantsContext);
  const { gameState } = useContext(GameContext);
  const { messageDispatch } = useContext(MessageContext);

  // const { allCuisines: cuisines } = restaurantState;
  const { restaurants } = gameState;

  const theme = useTheme();
  const navigate = useNavigate();

  const boxRef = useRef(null);
  const canvasRef = useRef(null);

  const [pins, setPins] = useState([]);
  const [ball, setBall] = useState(
    Matter.Bodies.circle(ballConfig.x, ballConfig.y, ballConfig.ballSize, {
      restitution: ballElastity,
      render: {
        fillStyle: "white",
      },
    })
  );
  const [bars, setBars] = useState([]);
  const [dests, setDests] = useState(mapSlotsToOptions(restaurants));
  const [dest, setDest] = useState({});
  const [selectedOption, setSelectedOption] = useState(null);

  // useEffect(() => {
  //   if (selectedOption) {
  //     const handleGameEnd = async () => {
  //       const selectedRestaurant = [restaurants[selectedOption]];
  //       alert(`You selected: ${selectedRestaurant}`);
  //       // const restaurants = await getRestaurantsByCuisines(selectedCuisines);

  //       // TODO: selectedRestaurant is only a restaurant name, should be the entire restaurant object at the point
  //       restaurantDispatch({
  //         type: UPDATE_RESTAURANTS,
  //         restaurantsData: selectedRestaurant,
  //       });

  //       navigate("/Restaurants");
  //     };

  //     handleGameEnd();
  //   }
  // }, [restaurants, restaurantDispatch, selectedOption, navigate]);

  useEffect(() => {
    const handleGameEndNavigate = () => {
      navigate("/Restaurants");
    };

    const handleGameEnd = async (selectedOption) => {
      const selectedRestaurant = restaurants[selectedOption];
      const message = `You selected: ${selectedRestaurant.name}`;

      restaurantDispatch({
        type: UPDATE_RESTAURANTS,
        payload: {
          restaurantsData: [selectedRestaurant],
        },
      });

      messageDispatch({
        type: UPDATE_MESSAGE,
        message: message,
        onModalClick: handleGameEndNavigate,
      });
    };

    if (Object.keys(dest).length > 0 && dests.length > 0) {
      console.log(dest);
      if (dest.x != null) {
        console.log("slot position x", dest.x);
        const slotPos = dest.x;
        let slotIdx = dests.reduce((slotIdx, curDest, curDestIdx) => {
          const prevSlotPos = curDestIdx === 0 ? 0 : dests[curDestIdx - 1].width;
          const curSlotPos = dests[curDestIdx].width;
          if (prevSlotPos <= slotPos && curSlotPos >= slotPos) {
            slotIdx = curDestIdx - 1;
          }
          // setSelectedOption(slotIdx);
          return slotIdx;
        }, 0);

        slotIdx = slotIdx === -1 ? 0 : slotIdx;
        handleGameEnd(slotIdx);
        console.log("The ball landed in slot: ", slotIdx);
      }
    }
  }, [dest, dests]);

  useEffect(() => {
    const setup = () => {
      let Engine = Matter.Engine;
      let Render = Matter.Render;
      let World = Matter.World;
      let Bodies = Matter.Bodies;
      let Composite = Matter.Composite;
      let Events = Matter.Events;

      let engine = Engine.create({});

      let render = Render.create({
        element: boxRef.current,
        engine: engine,
        canvas: canvasRef.current,
        options: {
          width: worldWidth,
          height: worldHeight,
          // background: "rgba(255, 0, 0, 0.5)",
          background: theme.palette.primary.light,
          wireframes: false,
        },
      });

      const floor = Bodies.rectangle(0, worldHeight - floorHeight, worldWidth * 2, floorHeight, {
        isStatic: true,
        render: {
          fillStyle: "white",
        },
      });

      World.add(engine.world, [floor, ball]);
      Composite.add(engine.world, pins);
      Composite.add(engine.world, bars);

      Engine.run(engine);

      Events.on(engine, "collisionEnd", function (event) {
        var pairs = event.pairs;
        for (var i = 0; i < pairs.length; i++) {
          var pair = pairs[i];
          pair.bodyA.render.fillStyle = "#fff";
          pair.bodyB.render.fillStyle = "#fff";
          if (pair.bodyA.position.y >= worldHeight - floorHeight - 16) {
            console.log("hit the floor");
            setDest(pair.bodyA.position);
          }
        }
      });

      Render.run(render);
    };
    if (pins.length > 0 && bars.length > 0 && ball != null) {
      setup();
    }
  }, [pins, ball, bars, theme.palette.primary.light]);

  useEffect(() => {
    const getPins = async () => {
      const pins = await generatePins(theme.palette.error.main);
      setPins(pins);
    };
    getPins();
  }, []);

  useEffect(() => {
    const getBars = async () => {
      const bars = await generateBars(theme.palette.error.main, restaurants.length);
      setBars(bars);
    };
    getBars();
  }, []);

  useEffect(() => {
    let timer = setTimeout(() => {
      console.log(ball.position);
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [ball, ball.position, World]);

  return (
    <div
      ref={boxRef}
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <canvas ref={canvasRef} />
    </div>
  );
};

export default Plinko;
