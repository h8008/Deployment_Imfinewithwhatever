import React, { useState, useEffect, useRef, useContext } from "react";
import { useTheme } from "@mui/material";
import Matter from "matter-js";

import { RestaurantsContext } from "../../../providers/RestaurantsProvider";
import { GameContext } from "../../../providers/GameProvider";
import { UPDATE_RESTAURANTS } from "../../../reducer/Main/actions";

import { useNavigate } from "react-router-dom";
import { MessageContext } from "../../../providers/MessageProvider";
import { UPDATE_MESSAGE } from "../../../reducer/Message/MessageAction";

import useInitializePins from "./Hooks/useInitializePins";
import useInitializeBars from "./Hooks/useInitializeBars";
import useInitializeBall from "./Hooks/useInitializeBall";
import useInitializeSlots from "./Hooks/useInitializeSlots";
import useInitializeAreaWidth from "./Hooks/useInitializeAreaWidth";
import useInitializeFloor from "./Hooks/useInitializeFloor";

import mapSlotsToOptions from "./Functions/MapSlotsToOptions";

import config from "./Config";
const { worldHeight, worldWidth, floorHeight } = config;

// const worldWidth = 900;
// const worldHeight = 850;
// const startPins = 5;
// const maxPins = 30;
// const numlines = 20;
// const pinSize = 5;
// const pinGap = 30;
// const marginTop = 150;
// const floorHeight = 20;
// const ballElastity = 0.9;
// const barsSectionWidth = worldWidth - 100;
// const barWidth = 3;

// const mapSlotsToOptions = (optionsData) => {
//   const extractNames = (options) => {
//     return options.map((option) => option.name);
//   };

//   const options = extractNames(optionsData);

//   if (options == null || options.length === 0) return [];
//   const numOptions = options.length;
//   const containers = Array(numOptions)
//     .fill()
//     .map((_, index) => index);

//   // Gets the the average width of a container for one option
//   const containerWidth = (barsSectionWidth - numOptions * barWidth) / numOptions;

//   // Creates an array of widths. Each element in the array is the width
//   // of a container that represents an option
//   const containerWidths = containers.map((container, idx) => {
//     return { index: idx, width: containerWidth };
//   });
//   // Creates an new array of widths. Each element in the array is the accumulated width
//   // of a container from left to right that represents an option
//   const newContainerWidths = [];
//   containerWidths.reduce((accWidth, curWidth, _) => {
//     const newAccWidth = curWidth.width + accWidth;
//     const newWidth = { ...curWidth, width: newAccWidth };
//     newContainerWidths.push({ ...newWidth });
//     return newAccWidth;
//   }, 0);

//   return newContainerWidths;
// };

// Get a list of restaurants as props from MultiDecisionMaker
const Plinko = (props) => {
  const { restaurantDispatch } = useContext(RestaurantsContext);
  const { gameState } = useContext(GameContext);
  const { messageDispatch } = useContext(MessageContext);

  const { restaurants } = gameState;

  const theme = useTheme();
  const navigate = useNavigate();

  const boxRef = useRef(null);
  const canvasRef = useRef(null);
  const [context, setContext] = useState(null);

  useEffect(() => {
    if (canvasRef && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      setContext(context);
    }
  }, []);

  const pins = useInitializePins("white");
  const ball = useInitializeBall();
  const slots = useInitializeSlots(restaurants);
  const floor = useInitializeFloor(slots.length, context);
  const bars = useInitializeBars(theme.palette.error.main, slots.length);
  const areaWith = useInitializeAreaWidth(slots.length);

  const [bounds] = useState(mapSlotsToOptions(restaurants, areaWith));
  const [dest, setDest] = useState({});

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
          restaurants: [selectedRestaurant],
        },
      });

      messageDispatch({
        type: UPDATE_MESSAGE,
        message: message,
        onModalClick: handleGameEndNavigate,
      });
    };

    if (Object.keys(dest).length > 0 && bounds.length > 0) {
      console.log(dest);
      if (dest.x != null) {
        console.log("slot position x", dest.x);
        const slotPos = dest.x;
        let slotIdx = bounds.reduce((slotIdx, curDest, curDestIdx) => {
          const prevSlotPos = curDestIdx === 0 ? 0 : bounds[curDestIdx - 1].width;
          const curSlotPos = bounds[curDestIdx].width;
          if (prevSlotPos <= slotPos && curSlotPos >= slotPos) {
            slotIdx = curDestIdx - 1;
          }
          return slotIdx;
        }, 0);

        slotIdx = slotIdx === -1 ? 0 : slotIdx;
        handleGameEnd(slotIdx);
        console.log("The ball landed in slot: ", slotIdx);
      }
    }
  }, [dest, bounds, messageDispatch, navigate, restaurantDispatch, restaurants]);

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
          background: theme.palette.primary.light,
          wireframes: false,
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
            console.log("hit the floor, at x position", pair.bodyA.position.x);
            setDest(pair.bodyA.position);
          }
        }
      });

      Render.run(render);
    };
    if (pins.length > 0 && bars.length > 0 && ball != null && floor != null) {
      setup();
    }
  }, [pins, ball, bars, theme.palette.primary.light, bounds, floor]);

  return (
    <div
      ref={boxRef}
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "red",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -50%)`,
        }}
      />
    </div>
  );
};

export default Plinko;
