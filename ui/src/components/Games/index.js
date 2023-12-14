import React, { useRef } from "react";

const Canvas = ({ children, ...otherProps }) => {
  const canvasRef = useRef(null);
  const context = canvasRef.getContext("2d");

  return (
    <canvas ref={canvasRef} {...otherProps}>
      {children}
    </canvas>
  );
};

export default Canvas;
