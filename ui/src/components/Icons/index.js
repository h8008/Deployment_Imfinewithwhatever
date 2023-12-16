import { Box3, Sphere, Vector2 } from "three";
import * as THREE from "three";
import { styled } from "@mui/material";
import React, { Suspense, useState, useRef, useEffect, useMemo } from "react";
import { Canvas, extend, useLoader, useThree, useFrame } from "@react-three/fiber";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader";
import { MapControls } from "three/examples/jsm/controls/OrbitControls";
import { OrbitControls } from "@react-three/drei";
import "./styles.css";

extend({ MapControls });

const CanvasComponent = styled("div")(({ children, ...otherProps }) => ({
  ...otherProps,
}));

function Controls() {
  const controls = useRef();
  const { camera, gl } = useThree();
  useFrame(() => controls.current.update());
  return (
    <mapControls
      ref={controls}
      args={[camera, gl.domElement]}
      enableDamping
      dampingFactor={0.1}
      maxZoom={40}
      minZoom={1.25}
    />
  );
}

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

function Svg({ url }) {
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
  const [scale, setScale] = useState({ x: 50, y: 50 });
  const ref = useRef();
  useEffect(() => {
    const box = new Box3().setFromObject(ref.current);
    const sphere = new Sphere();
    box.getBoundingSphere(sphere);
    setCenter([-sphere.center.x, -sphere.center.y, 0]);
    // setRotation(new THREE.Vector3(0, 0, 0.02));
    setRotation([0, 0, Math.PI / 4]);
  }, []);

  return (
    <group rotation={rotation} position={center} ref={ref}>
      {shapes.map((props) => (
        <Cell key={props.shape.uuid} {...props} />
      ))}
    </group>
  );
}

function Icons({ children, ...otherProps }) {
  return (
    <CanvasComponent style={otherProps.style}>
      <Canvas orthographic camera={{ position: [0, 0, 5], zoom: 0.2, up: [0, 0, 0] }}>
        <Suspense fallback={null}>
          <Svg url="/ramen.svg" />
        </Suspense>
        <Controls />
        <axesHelper args={[200]} />
        <OrbitControls />
      </Canvas>
    </CanvasComponent>
  );
}

export default Icons;
