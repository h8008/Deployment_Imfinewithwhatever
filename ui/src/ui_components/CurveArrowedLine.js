import { Fragment, useState, useEffect, useRef } from "react";

const getLength = (src, dest) => {
  return Math.sqrt(Math.pow(src.x - dest.x, 2) + Math.pow(dest.y - src.y, 2));
};

const CurveArrowedLine = (props) => {
  const { visible, start, stop, data, color } = props;

  const dataRef = useRef(null);
  const markerNode = useRef(null);
  const markerEndNode = useRef(null);
  const [dest, setDest] = useState(null);
  const [pathD, setPathD] = useState(null);

  var style = {
    position: "absolute",
    zIndex: 3,
  };

  useEffect(() => {
    var pathD = "M" + start.x + "," + start.y + " ";
    var finalStop = { x: stop.x - getLength(start, stop), y: stop.y };
    pathD += "L" + stop.x + "," + stop.y + " ";
    pathD += "H" + finalStop.x;
    setPathD(pathD);
    setDest(finalStop);
  }, [start, stop]);

  useEffect(() => {
    if (dataRef && dataRef.current && dest) {
      console.log(dataRef.current);
      const charCount = data
        .split(",")
        .map((str) => Array.from(str).length)
        .reduce((acc, cur) => acc + cur, 0);
      dataRef.current.style.transform = `translate(${dest.x - charCount * 10}px, ${dest.y}px)`;
    }
  }, [data, data.length, dataRef, dest]);

  return (
    <Fragment>
      {visible && pathD && (
        <Fragment>
          <svg width="1500" height="300" style={style}>
            <defs>
              <marker ref={markerNode} id="arrow">
                <path d={pathD} style={{ fill: { color } }} />
              </marker>
            </defs>
            <path ref={markerEndNode} d={pathD} style={{ stroke: color, strokeWidth: "1.25px", fill: "none" }} />
          </svg>
          <g>
            <text ref={dataRef} fill={color}>
              {data}
            </text>
          </g>
        </Fragment>
      )}
    </Fragment>
  );
};

export default CurveArrowedLine;
