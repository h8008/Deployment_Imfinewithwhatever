import * as THREE from "three";
import { Fragment, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { extend, Canvas, useFrame, useThree, useLoader } from "@react-three/fiber";
import { Physics, usePlane, useSphere } from "@react-three/cannon";
// import { OrbitControls } from '@react-three/drei';
import niceColors from "nice-color-palettes";

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

export const Walls = () => {
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
      <div style={{ width: "20vw", height: "100vh" }}>
        <Canvas
          orthographic
          camera={{ position: [0, 0, 100], zoom: 100 }}
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "red",
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
            width: "100%",
            height: "50%",
            backgroundColor: "red",
          }}
        >
          <Wall posFactors={posFactors[0]} boundFactor={1} />
        </Canvas>
        <Canvas
          orthographic
          camera={{ position: [0, 0, 100], zoom: 100 }}
          style={{
            width: "100%",
            height: "50%",
            backgroundColor: "red",
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
            width: "100%",
            height: "100%",
            backgroundColor: "red",
          }}
        >
          <Wall posFactors={posFactors[3]} boundFactor={6} count={counts[3]} />
        </Canvas>
      </div>
    </div>
  );
};

function InstancedSpheres({ count = 50 }) {
  const { viewport } = useThree();
  // const texture = useLoader(THREE.TextureLoader, <IoFastFoodOutline />);
  const [ref, api] = useSphere((index) => ({
    mass: data[index].scale * 100,
    position: [8 - Math.random() * 8, viewport.height * 3, 0, 0],
    args: [data[index].scale],
  }));
  const colorArray = useMemo(
    () => Float32Array.from(new Array(count).fill().flatMap((_, i) => tempColor.set(data[i].color).toArray())),
    [count]
  );
  useLayoutEffect(() => {
    // Cannon does not support variable size for instances (yet), so this is something that's exclusive to react
    for (let i = 0; i < count; i++) {
      api.at(i).scaleOverride([data[i].scale, data[i].scale, data[i].scale]);
    }
  }, [api, count]);
  return (
    <instancedMesh ref={ref} args={[null, null, count]}>
      <sphereGeometry args={[1, 64, 64]}>
        <instancedBufferAttribute attach="attributes-color" args={[colorArray, 3]} />
      </sphereGeometry>
      <meshBasicMaterial toneMapped={false} vertexColors />
    </instancedMesh>
  );
}

function Wall({ posFactors, boundFactor, count }) {
  const { viewport } = useThree();
  const position = [viewport.width / 2, viewport.height / 6, 0].map((base, i) => base * posFactors[i]);

  return (
    <>
      <Physics gravity={[0, -50, 0]}>
        <group position={[0, 0, -10]}>
          <Borders position={position} boundFactor={boundFactor} />
          <InstancedSpheres count={count} />
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

export default Walls;
