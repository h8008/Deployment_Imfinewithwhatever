import * as THREE from "three";
import { Box3, Sphere, Vector2 } from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader";
import { useContext, useState, useMemo, useEffect, useRef } from "react";
import { AssetsContext } from "../../providers/AssetsProvider";
import { extend, Canvas, useFrame, useThree, useLoader } from "@react-three/fiber";
import { Physics, usePlane, useSphere } from "@react-three/cannon";
// import { OrbitControls } from '@react-three/drei';
import niceColors from "nice-color-palettes";
import Icons from "../Icons";

const tempColor = new THREE.Color();
const data = Array.from({ length: 1000 }, () => ({
  color: niceColors[16][Math.floor(Math.random() * 5)],
  scale: 0.25 + Math.random(),
}));
const posFactors = [
  [0, 1, 0],
  [0, -3, 0],
  [0, -4, 0],
  [0, -4, 0],
];
const counts = [50, 50, 100, 100];

export const FoodWalls = () => {
  const { assets } = useContext(AssetsContext);
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Canvas>
        <Svg url="/ramen.svg" />
      </Canvas>
      {/* <div style={{ width: "20vw", height: "100vh" }}>
        <Canvas
          orthographic
          camera={{ position: [0, 0, 100], zoom: 100 }}
          style={{
            width: "20%",
            height: "100%",
            // backgroundColor: "red",
          }}
        >
          <Wall posFactors={posFactors[2]} boundFactor={6} count={counts[2]} />
        </Canvas>
      </div>
      <div style={{ height: "100vh", width: "60%" }}>
        <Canvas
          orthographic
          camera={{ position: [0, 0, 100], zoom: 100 }}
          style={{
            width: "60%",
            height: "50%",
            // backgroundColor: "red",
          }}
        >
          <Wall posFactors={posFactors[0]} boundFactor={1} />
        </Canvas>
        <Canvas
          orthographic
          camera={{ position: [0, 0, 100], zoom: 100 }}
          style={{
            width: "60%",
            height: "50%",
            // backgroundColor: "red",
          }}
        >
          <Wall posFactors={posFactors[1]} boundFactor={1} />
        </Canvas>
      </div>
      <div style={{ width: "20vw", height: "100vh" }}>
        <Canvas
          orthographic
          camera={{ position: [0, 0, 100], zoom: 100 }}
          style={{
            width: "20%",
            height: "100%",
            // backgroundColor: "red",
          }}
        >
          <Wall posFactors={posFactors[3]} boundFactor={6} count={counts[3]} />
        </Canvas>
      </div> */}
    </div>
  );
};

function Cell({ color, shape, fillOpacity }) {
  const [hovered, set] = useState(false);

  return (
    <mesh onPointerOver={() => set(true)} onPointerOut={() => set(false)}>
      <meshBasicMaterial
        attach="material"
        color={hovered ? "#373740" : color}
        opacity={fillOpacity}
        depthWrite={false}
        transparent
      />
      <shapeBufferGeometry attach="geometry" args={[shape]} />
    </mesh>
  );
}

function Svg({ url, position }) {
  const { paths } = useLoader(SVGLoader, url);
  const shapes = useMemo(
    () =>
      paths.flatMap((p, i) =>
        p.toShapes(true).map((shape) => ({ shape, color: p.color, fillOpacity: p.userData.style.fillOpacity }))
      ),
    [paths]
  );

  const [center, setCenter] = useState([0, 0, 0]);
  const [rotation, setRotation] = useState([0, 0, 0]);
  const ref = useRef();
  useEffect(() => {
    const box = new Box3().setFromObject(ref.current);
    const sphere = new Sphere();
    box.getBoundingSphere(sphere);
    setCenter([-sphere.center.x, -sphere.center.y, 0]);
    setRotation([0, 0, Math.PI / 4]);
  }, []);

  return (
    <group rotation={rotation} position={position} ref={ref}>
      {shapes.map((props) => (
        <Cell key={props.shape.uuid} {...props} />
      ))}
    </group>
  );
}

function Wall({ posFactors, boundFactor, count }) {
  const { viewport } = useThree();
  const position = [viewport.width / 2, viewport.height / 6, 0].map((base, i) => base * posFactors[i]);
  // const svgPositions =

  return (
    <>
      <Physics gravity={[0, -50, 0]}>
        <group position={[0, 0, -10]}>
          <Borders position={position} boundFactor={boundFactor} />
          <Svg url="/ramen.svg" />
        </group>
      </Physics>
      {/* <OrbitControls /> */}
    </>
  );
}

function Borders(props) {
  const { position, boundFactor } = props;
  const { viewport } = useThree();
  // const boundFactor = 8;

  return (
    <>
      <Plane position={[...position]} rotation={[-Math.PI / 2, 0, 0]} />
      {/* <PlaneHelper position={[...position]} /> */}
      <Plane position={[-viewport.width / boundFactor - 1, 0, 0]} rotation={[0, Math.PI / 2, 0]} />
      {/* <PlaneHelper position={[-viewport.width / boundFactor - 1, 0, 0]} /> */}
      <Plane position={[viewport.width / boundFactor + 1, 0, 0]} rotation={[0, -Math.PI / 2, 0]} />
      {/* <PlaneHelper position={[viewport.width / boundFactor + 1, 0, 0]} /> */}
      <Plane position={[0, 0, -1]} rotation={[0, 0, 0]} />
      {/* <PlaneHelper position={[0, 0, -1]} /> */}
      <Plane position={[0, 0, 12]} rotation={[0, -Math.PI, 0]} />
      {/* <PlaneHelper position={[0, 0, 12]} /> */}
    </>
  );
}

function Plane({ color, position = [0, 0, 0], rotation, dimension, ...props }) {
  const [, api] = usePlane(() => ({ ...props }));
  useEffect(() => {
    api.position.set(...position);
    api.rotation.set(...rotation);
    api.scaleOverride([1, 5, 0]);
  }, [api, position, rotation]);
}

function PlaneHelper({ position }) {
  const [plane] = useState(() => new THREE.Plane(new THREE.Vector3(...position), 0));
  return <planeHelper args={[plane, 5, "white"]} />;
}

function Mouse() {
  const { viewport } = useThree();
  const [, api] = useSphere(() => ({ type: "Kinematic", args: [4] }));
  useFrame((state) => api.position.set((state.mouse.x * viewport.width) / 2, (state.mouse.y * viewport.height) / 2, 7));
}

export default FoodWalls;
