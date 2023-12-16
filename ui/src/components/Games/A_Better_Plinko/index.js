import { Component, useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Matter from "matter-js";
import { useTheme } from "@mui/material";

import { config, ballConfig, pegsConfig } from "./Config";
import { GameContext } from "../../../providers/GameProvider";
import { RestaurantsContext } from "../../../providers/RestaurantsProvider";
import { MessageContext } from "../../../providers/MessageProvider";
import { UPDATE_RESTAURANTS } from "../../../reducer/Main/actions";
import { UPDATE_MESSAGE } from "../../../reducer/Message/MessageAction";

var Engine = Matter.Engine,
  Events = Matter.Events,
  World = Matter.World,
  Render = Matter.Render,
  Runner = Matter.Runner;

const useHandleDispatchMessage = (message, onModalClick) => {
  const { messageDispatch } = useContext(MessageContext);
  if (message) {
    messageDispatch({
      type: UPDATE_MESSAGE,
      message: message,
      onModalClick: onModalClick,
    });
  }
};

const useHandleDispatchChoice = (choice, setRun) => {
  const { restaurantDispatch } = useContext(RestaurantsContext);
  if (choice) {
    restaurantDispatch({
      type: UPDATE_RESTAURANTS,
      payload: {
        restaurants: [choice],
      },
    });
    setRun(false);
  }
};

const useHandleNavigate = (shouldNavigate, next) => {
  const navigate = useNavigate();
  if (shouldNavigate && next) {
    navigate(next);
  }
};

const Plinko = ({ children, ...otherProps }) => {
  const [message, setMessage] = useState(null);
  const [choice, setChoice] = useState(null);
  const [next, setNext] = useState(null);
  const [shouldNavigate, setShouldNavigate] = useState(false);
  const [run, setRun] = useState(true);

  const handleGameEnd = async (selected) => {
    const choice = restaurants[selected];
    const message = `You selected: ${choice.name}`;
    setMessage(message);
    setChoice(choice);
    setNext("/Restaurants");
  };

  useHandleDispatchChoice(choice, setRun);
  useHandleDispatchMessage(message, () => setShouldNavigate(true));
  useHandleNavigate(shouldNavigate, next);

  const theme = useTheme();
  const canvasRef = useRef(null);
  const boxRef = useRef(null);
  const { gameState } = useContext(GameContext);
  const restaurants = gameState.restaurants;

  return (
    <PlinkoComponent
      handleGameEnd={handleGameEnd}
      slots={restaurants}
      theme={theme}
      box={boxRef}
      run={run}
      canvas={canvasRef}
      {...otherProps}
    />
  );
};

class PlinkoComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      run: props.run,
      slots: props.slots,
      bucket: {},
      dests: [],
      buckets: [],
    };
    this.handleGameEnd = props.handleGameEnd;
    this.canvas = props.canvas;
    this.box = props.box;
    this.theme = props.theme;
    this.setup = this.setup.bind(this);
    this.run = this.run.bind(this);
    this.findBucket = this.findBucket.bind(this);
    this.particle = this.particle.bind(this);
    this.draw = this.draw.bind(this);
    this.bound = this.bound.bind(this);
    this.floor = this.floor.bind(this);
    this.updateState = this.updateState.bind(this);
    this.mapBucketsToOptions = this.mapBucketsToOptions.bind(this);
    this.handleGameEnd = this.handleGameEnd.bind(this);
  }

  setup() {
    this.engine = Engine.create();
    this.world = this.engine.world;
    this.particle();
    this.pegs();
    this.bound("white", 4);
    this.floor();
    this.setState({
      ...this.state,
      run: true,
      buckets: this.mapBucketsToOptions(this.state.slots),
    });
  }

  //////////////////////////////////// Game Layout Setup ////////////////////////////////////
  particle() {
    this.ball = Matter.Bodies.circle(ballConfig.x, ballConfig.y, ballConfig.r, {
      restitution: ballConfig.ballElastity,
      render: {
        fillStyle: "white",
      },
    });
    World.add(this.world, this.ball);
  }

  async bound(color, num = 7) {
    const totalSize = config.worldWidth;
    const numBuckets = num;
    const bucketSize = (totalSize - num * config.barWidth) / numBuckets;
    const promises = Array(num)
      .fill()
      .map((_, i) => {
        const x = i * (bucketSize + config.barWidth) + 5;
        const y = 800;
        const w = config.barWidth;
        const h = 100;
        const bound = Matter.Bodies.rectangle(x, y, w, h, {
          isStatic: true,
          render: {
            fillStyle: color,
          },
        });
        World.add(this.world, bound);
        return bound;
      });
    const bounds = await Promise.all(promises);
    this.bounds = bounds;
  }

  floor(color = "white") {
    var f = Matter.Bodies.rectangle(0, 830, config.worldWidth * 2, 20, {
      isStatic: true,
      render: {
        fillStyle: color,
      },
    });
    this.floor = f;
    World.add(this.world, f);
  }

  mapBucketsToOptions(options) {
    if (options == null || options.length === 0) return [];
    const numOptions = options.length;
    var buckets = Array(numOptions + 1)
      .fill()
      .map((_, i) => i);
    const bucketSize = Math.floor(config.worldWidth - numOptions * config.barWidth) / numOptions;
    buckets = buckets.map((b, i) => {
      return { index: i, width: bucketSize };
    });
    buckets = buckets
      .reduce(
        (acc, cur, i) => {
          if (i === 0) return acc;
          const prev = i - 1;
          const accBucketSize = cur.width + acc[prev][1];
          return [...acc, [{ index: i, width: accBucketSize }, accBucketSize]];
        },
        [[{ index: 0, width: 0 }, 0]]
      )
      .map((bucket) => bucket[0]);
    return buckets;
  }

  async pegs() {
    var addPeg = (i, j) => {
      var xoffset = 40;
      var x = j % 2 === 0 ? i * spacing + (1 / 2) * xoffset : i * spacing + xoffset,
        y = j * spacing + 30,
        r = pegsConfig.r,
        color = pegsConfig.color;
      var p = Matter.Bodies.circle(x, y, r, {
        isStatic: true,
        restitution: 0.5,
        friction: 0,
        render: {
          fillStyle: color,
        },
      });
      World.add(this.world, p);
    };
    var spacing = (pegsConfig.rows / pegsConfig.cols) * 20;
    var cols = new Array(pegsConfig.cols).fill().map((_, j) => j);
    var rows = new Array(pegsConfig.rows).fill().map((row, i) => cols);
    const promises = rows.map((row, i) => row.map((col, j) => addPeg(i, j)));
    const pegs = await Promise.all(promises);
    this.pins = pegs;
    console.log("pegs", pegs);
  }

  draw() {
    const render = Render.create({
      element: this.box.current,
      engine: this.engine,
      canvas: this.canvas.current,
      options: {
        width: config.worldWidth,
        height: config.worldHeight,
        background: this.theme.palette.primary.dark.main,
        wireframes: false,
      },
    });
    Render.run(render);
  }

  updateState(newProps) {
    const { key, val } = newProps;
    const newState = { ...this.state };
    newState[key] = val;
    this.setState({ ...newState });
  }

  run() {
    if (!this.state.run) return;
    Runner.run(this.engine);
    const state = this.state;
    const updateState = this.updateState;
    const findBucket = this.findBucket;
    console.log("floor", this.floor);
    const ground = this.floor.position.y;
    Events.on(this.engine, "collisionEnd", function (event) {
      var pairs = event.pairs;
      for (let i = 0; i < pairs.length; i++) {
        var pair = pairs[i];
        // pair.bodyA.render.fillStyle = "black";
        pair.bodyB.render.fillStyle = "white";
        if (pair.bodyA.position.y >= ground - ballConfig.r * 2) {
          console.log("hit the floor");
          updateState({ key: "bucket", val: pair.bodyA.position });
          updateState({ key: "run", val: false });
          findBucket(pair.bodyA.position);
        }
        // updateState({ key: "dests", val: [...state.dests, pair.bodyA.position] });
      }
    });
  }

  findBucket(bucket) {
    const buckets = this.state.buckets;
    if (bucket && Object.keys(bucket).length > 0 && buckets && buckets.length > 0) {
      console.log(bucket);
      if (bucket.x != null) {
        console.log("slot position x", bucket.x);
        const slotPos = bucket.x;
        let slotIdx = buckets.reduce((slotIdx, curDest, curDestIdx) => {
          const prevSlotPos = curDestIdx === 0 ? 0 : buckets[curDestIdx - 1].width;
          const curSlotPos = buckets[curDestIdx].width;
          if (prevSlotPos <= slotPos && curSlotPos >= slotPos) {
            // slotIdx = curDestIdx - 1;
            slotIdx = curDestIdx;
          }
          return slotIdx;
        }, 0);

        slotIdx = slotIdx === -1 ? 0 : slotIdx;
        this.handleGameEnd(slotIdx);
        console.log("The ball landed in slot: ", slotIdx);
      }
    }
  }

  componentDidMount() {
    this.setup();
    this.draw();
  }

  componentDidUpdate() {
    this.run();
    this.findBucket();
  }

  render() {
    return (
      <div
        ref={this.box}
        style={{
          width: "100vw",
          height: "100vh",
        }}
      >
        <canvas ref={this.canvas} />
      </div>
    );
  }
}

export default Plinko;
