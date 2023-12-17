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
  [1, -1, 1],
  [1, 1, 1],
  [1, 1, 1],
];
const counts = [50, 50, 100, 100];
const tempObject = new THREE.Object3D();

export const EggYolk = (props) => {
  return (
    // <div
    //   style={{
    //     height: "100vh",
    //     display: "flex",
    //     flexDirection: "row",
    //     justifyContent: "center",
    //     alignItems: "center",
    //   }}
    // >
    //   <div style={{ width: "20vw", height: "100vh" }}>
    //     <Canvas
    //       orthographic
    //       camera={{ position: [0, 0, 100], zoom: 100 }}
    //       style={{
    //         width: "100%",
    //         height: "100%",
    //         backgroundColor: "red",
    //         zIndex: -1,
    //         position: "relative",
    //       }}
    //     >
    //       <Wall
    //         posFactors={posFactors[2]}
    //         boundFactor={6}
    //         count={counts[2]}
    //         style={{ zIndex: "1", position: "absolute" }}
    //         layout={"vertical"}
    //       />
    //     </Canvas>
    //   </div>
    //   <div style={{ height: "100vh", width: "60%" }}>
    //     <Canvas
    //       orthographic
    //       camera={{ position: [0, 0, 100], zoom: 100 }}
    //       style={{
    //         width: "100%",
    //         height: "50%",
    //         backgroundColor: "red",
    //       }}
    //     >
    //       <Wall posFactors={posFactors[0]} boundFactor={1} count={counts[0]} layout={"horizontal"} location={"top"} />
    //     </Canvas>
    //     <Canvas
    //       orthographic
    //       camera={{ position: [0, 0, 100], zoom: 100 }}
    //       style={{
    //         width: "100%",
    //         height: "50%",
    //         backgroundColor: "red",
    //       }}
    //     >
    //       <Wall
    //         posFactors={posFactors[1]}
    //         boundFactor={1}
    //         count={counts[1]}
    //         layout={"horizontal"}
    //         location={"bottom"}
    //       />
    //     </Canvas>
    //   </div>
    //   <div style={{ width: "20vw", height: "100vh" }}>
    //     <Canvas
    //       orthographic
    //       camera={{ position: [0, 0, 100], zoom: 100 }}
    //       style={{
    //         width: "100%",
    //         height: "100%",
    //         backgroundColor: "red",
    //       }}
    //     >
    //       <Wall posFactors={posFactors[3]} boundFactor={6} count={counts[3]} layout={"vertical"} />
    //     </Canvas>
    //   </div>
    // </div>

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
          {/* </Canvas>
    </div> */}
          {/* <div style={{ height: "100vh", width: "60%" }}>
      <Canvas
        orthographic
        camera={{ position: [0, 0, 100], zoom: 100 }}
        style={{
          width: "100%",
          height: "50%",
          backgroundColor: "red",
        }}
      > */}
          <Wall posFactors={posFactors[1]} boundFactor={1} count={counts[0]} layout={"horizontal"} location={"top"} />
          {/* </Canvas> */}
          {/* <Canvas
        orthographic
        camera={{ position: [0, 0, 100], zoom: 100 }}
        style={{
          width: "100%",
          height: "50%",
          backgroundColor: "red",
        }}
      > */}
          <Wall
            posFactors={posFactors[2]}
            boundFactor={2}
            count={counts[1]}
            layout={"horizontal"}
            location={"bottom"}
          />
          {/* </Canvas>
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
      > */}
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
  const getRandomPosition = (upperBound, lowerBound, count) => {
    const positions = Array(count)
      .fill()
      .map((_, i) => (lowerBound < 0 ? Math.random() + upperBound : Math.random() + lowerBound));
    return positions[Math.floor(positions.length / 2)];
  };

  useFrame((state) => {
    let i = 0;
    const time = state.clock.getElapsedTime();
    const sign = location === "top" ? 1 : -1;
    // const matrixRotation = layout === "horizontal" ? [0, 0, sign * (Math.PI / 2)] : [0, 0, 0];

    const matrixRotations = {
      horizontal: [0, 0, sign * (Math.PI / 2)],
      vertical: [0, 0, 0],
    };
    const matrixRotation = matrixRotations[layout];

    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 10; y++) {
        const id = i++;
        const angle = Math.sin(x / 4 - time) + Math.sin(y / 4 + time) * 2;
        const positions = {
          left: [getRandomPosition(-6, -8, count), y - 5, 0],
          right: [getRandomPosition(6, 8, count), 5 - y, 0],
          top: [3, y - 5, 0],
          bottom: [3, 5 - y, 0],
        };

        // const position = location === "left" ? [-7, y - 5, 0] : [7, 5 - y, 0];
        const position = positions[location];

        // console.log("position", position);

        const rotation = [angle, angle, angle];
        tempObject.rotation.set(...rotation);
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
