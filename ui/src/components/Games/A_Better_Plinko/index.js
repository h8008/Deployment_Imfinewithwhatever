import { Component, useContext, useRef } from "react";
import Matter, { Composite } from "matter-js";
import { useTheme } from "@mui/material";

import { config, ballConfig, pegsConfig } from "./Config";
import { GameContext } from "../../../providers/GameProvider";

var Engine = Matter.Engine,
  World = Matter.World,
  Bodies = Matter.Bodies,
  Render = Matter.Render;
Composite = Matter.Composite;

const Plinko = ({ children, ...otherProps }) => {
  const theme = useTheme();
  const canvasRef = useRef(null);
  const boxRef = useRef(null);
  const { gameState } = useContext(GameContext);
  const restaurants = gameState.restaurants;

  return <PlinkoComponent slots={restaurants} theme={theme} box={boxRef} canvas={canvasRef} {...otherProps} />;
};

class PlinkoComponent extends Component {
  constructor(props) {
    super(props);
    this.slots = props.slots;
    this.canvas = props.canvas;
    this.box = props.box;
    this.theme = props.theme;
    this.setup = this.setup.bind(this);
    this.particle = this.particle.bind(this);
    this.draw = this.draw.bind(this);
    this.bound = this.bound.bind(this);
  }

  setup() {
    this.engine = Engine.create();
    this.world = this.engine.world;
    this.particle();
    this.pegs();
    this.bound("white", 4);

    Matter.Runner.run(this.engine);
  }

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
    const numBuckets = num - 1;
    // const buckets = Array(num - 1).fill().map((_, i) => i)
    // const bounds = Array(num).fill().map((_, i) => i)

    const bucketSize = (totalSize - num * config.barWidth) / numBuckets;
    // const buckets = Array(numBuckets).fill().map((_, i) => ({ index: i, width: bucketSize }))
    const promises = Array(num)
      .fill()
      .map((_, i) => {
        const x = i * (bucketSize + config.barWidth) + 5;
        // const y = config.marginTop + config.numlines * ballConfig.r + (config.numlines - 1) * config.pinGap;
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

  componentDidMount() {
    this.setup();
    this.draw();
  }

  render() {
    return (
      <div
        ref={this.box}
        style={{
          width: "100vw",
          height: "100vh",
          backgroundColor: "red",
        }}
      >
        <canvas ref={this.canvas} />
      </div>
    );
  }
}

export default Plinko;
