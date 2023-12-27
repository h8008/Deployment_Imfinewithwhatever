import * as THREE from "three";
import { Fragment, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { extend, Canvas, useFrame, useThree, useLoader } from "@react-three/fiber";
import { Physics, useBox, usePlane, useSphere } from "@react-three/cannon";
import { Geometry, Base, Addition, Subtraction, ReverseSubtraction, Intersection, Difference } from "@react-three/csg";
import { OrbitControls } from "@react-three/drei";
import niceColors from "nice-color-palettes";

const tempColor = new THREE.Color();
const data = Array.from({ length: 1000 }, () => ({
  color: niceColors[16][Math.floor(Math.random() * 5)],
  scale: 0.25 + Math.random(),
}));
// const posFactors = [
//   [0, -2, 0],
//   [0, -3, 0],
//   [0, -6, 0],
//   [0, -3, 0],
// ];
const posFactors = [
  [1, 1, 1],
  [1, -2, 1],
  [1, 1, 1],
  [1, 1, 1],
];
const counts = [80, 80, 100, 100];
const tempObject = new THREE.Object3D();

export const EggYolk = (props) => {
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
      <div style={{ width: "100vw", height: "100vh" }}>
        <Canvas
          orthographic
          camera={{ position: [0, 0, 100], zoom: 100 }}
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "red",
          }}
        >
          <Wall posFactors={posFactors[2]} boundFactor={2} count={counts[2]} layout={"vertical"} location={"left"} />
          <Wall posFactors={posFactors[1]} boundFactor={1} count={counts[0]} layout={"horizontal"} location={"top"} />
          <Wall
            posFactors={posFactors[2]}
            boundFactor={2}
            count={counts[1]}
            layout={"horizontal"}
            location={"bottom"}
          />
          <Wall posFactors={posFactors[3]} boundFactor={2} count={counts[3]} layout={"vertical"} location={"right"} />
          <OrbitControls position={[0, 0, 100]} />
        </Canvas>
      </div>
    </div>
  );
};

function SolidBoxes({ count = 50, layout, location, position }) {
  const { viewport } = useThree();
  const meshRef = useRef();
  const colorArray = useMemo(
    () => Float32Array.from(new Array(count).fill().flatMap((_, i) => tempColor.set(data[i].color).toArray())),
    [count]
  );
  const getRandomPosition = (upperBound, lowerBound) => {
    // const positions = Array(count)
    //   .fill()
    //   .map((_, i) =>
    //     lowerBound < 0
    //       ? Math.floor(-1 * Math.random() * Math.abs(upperBound - lowerBound) + lowerBound)
    //       : Math.floor(Math.random() * Math.abs(upperBound - lowerBound) + lowerBound)
    //   );
    const position =
      lowerBound < 0
        ? Math.floor(-1 * Math.random() * Math.abs(upperBound - lowerBound) + lowerBound)
        : Math.floor(Math.random() * Math.abs(upperBound - lowerBound) + lowerBound);

    return position;
  };

  useFrame((state, delta) => {
    let i = 0;
    const time = state.clock.getElapsedTime();
    const signs = { left: 0, top: 1, bottom: -1, right: 0 };
    const sign = signs[location];
    // const matrixRotation = layout === "horizontal" ? [0, 0, sign * (Math.PI / 2)] : [0, 0, 0];

    const matrixRotations = {
      horizontal: [0, 0, sign * (Math.PI / 2)],
      vertical: [0, 0, 0],
    };
    const matrixRotation = matrixRotations[layout];

    for (let x = -10; x < 10; x++) {
      const leftPositions = Array(10)
        .fill()
        .map(() => getRandomPosition(-2, -6));
      const rightPositions = Array(10)
        .fill()
        .map(() => getRandomPosition(2, 6));
      for (let y = -10; y < 10; y++) {
        // const cur_rotation = tempObject.rotation;
        // const new_rotation = [1 * delta + cur_rotation.x, 0.5 * delta + cur_rotation.y, cur_rotation.z];
        const id = i++;
        const positions = {
          left: [-x + 2, y, 0],
          right: [x - 2, y, 0],
          top: [Math.abs(x) - 4, y, 0],
          bottom: [-1 * Math.abs(x) + 13, y, 0],
        };

        const position = positions[location];
        const speed = Math.sin(x / 4 + time) + Math.sin(y / 4 + time);
        tempObject.rotation.x = location === "top" || location === "bottom" ? speed : 0;
        tempObject.rotation.y = location === "left" || location === "right" ? speed : 0;
        tempObject.rotation.z = speed * 2;

        // tempObject.rotation.y = Math.sin(x / 4 + time) + Math.sin(y / 4 + time) + 0;
        // tempObject.rotation.z = tempObject.rotation.y * 2;

        tempObject.position.set(...position);
        const scale = data[id].scale;
        tempObject.scale.setScalar(scale);
        tempObject.updateMatrix();
        meshRef.current.setMatrixAt(id, tempObject.matrix);
      }
    }
    meshRef.current.rotation.set(...matrixRotation);
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, count]}>
      <boxGeometry args={[1, 1, 1]}>
        <instancedBufferAttribute attach="attributes-color" args={[colorArray, 3]} />
      </boxGeometry>
      <meshBasicMaterial toneMapped={false} vertexColors depthTest={false} />
    </instancedMesh>
  );
}

function Wall({ posFactors, boundFactor, count, layout, location, style, ...otherProps }) {
  const { viewport } = useThree();
  const position = [viewport.width / 2, viewport.height / 2, 0].map((base, i) => base * posFactors[i]);

  return (
    <Physics gravity={[0, -50, 0]}>
      <group position={[0, 0, -10]}>
        <Borders position={position} boundFactor={boundFactor} />
        <SolidBoxes count={count} layout={layout} location={location} />
      </group>
    </Physics>
  );
}

function Borders(props) {
  const { position, boundFactor } = props;
  const { viewport } = useThree();

  return (
    <>
      {/* Do not delete!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Working Code !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */}
      {/* <Plane position={[...position]} rotation={[-Math.PI / 2, 0, 0]} /> */}
      {/* <PlaneHelper position={[...position]} /> */}
      {/* <Plane position={[-viewport.width / boundFactor - 1, 0, 0]} rotation={[0, Math.PI / 2, 0]} /> */}
      {/* <PlaneHelper position={[-viewport.width / boundFactor - 1, 0, 0]} /> */}
      {/* <Plane position={[viewport.width / boundFactor + 1, 0, 0]} rotation={[0, -Math.PI / 2, 0]} /> */}
      {/* <PlaneHelper position={[viewport.width / boundFactor + 1, 0, 0]} /> */}
      {/* <Plane position={[0, 0, -1]} rotation={[0, 0, 0]} /> */}
      {/* <PlaneHelper position={[0, 0, -1]} /> */}
      {/* <Plane position={[0, 0, 5]} rotation={[0, -Math.PI, 0]} /> */}
      {/* <PlaneHelper position={[0, 0, 12]} /> */}

      <Plane position={[...position]} rotation={[-Math.PI / 2, 0, 0]} />
      {/* <PlaneHelper position={[...position]} /> */}
      <Plane position={[-viewport.width, 0, 0]} rotation={[0, Math.PI / 2, 0]} />
      {/* <PlaneHelper position={[-viewport.width / boundFactor - 1, 0, 0]} /> */}
      <Plane position={[viewport.width, 0, 0]} rotation={[0, -Math.PI / 2, 0]} />
      {/* <PlaneHelper position={[viewport.width / boundFactor + 1, 0, 0]} /> */}
      <Plane position={[0, 0, -1]} rotation={[0, 0, 0]} />
      {/* <PlaneHelper position={[0, 0, -1]} /> */}
      <Plane position={[0, 0, 5]} rotation={[0, -Math.PI, 0]} />
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

export default EggYolk;
