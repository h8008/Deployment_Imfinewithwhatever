import { Fragment, useState, useEffect, useRef } from "react";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material";
import { text } from "d3";

const getLength = (src, dest) => {
  return Math.sqrt(Math.pow(src.x - dest.x, 2) + Math.pow(dest.y - src.y, 2));
};

const ArrowComponent = styled("div")((props) => ({
  width: props.width,
  height: props.height,
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
}));

const CurveArrowedLine = (props) => {
  const { visible, start, stop, data, color, width, height, backgroundColor, labelDirection } = props;

  const dataRef = useRef(null);
  const markerNode = useRef(null);
  const markerEndNode = useRef(null);
  const [dest, setDest] = useState(null);
  const [pathD, setPathD] = useState(null);
  const [textPathD, setTextPathD] = useState(null);

  var style = {
    position: "absolute",
    zIndex: 3,
    display: "flex",
    flexDirection: "row",
  };

  useEffect(() => {
    var pathD = "M" + start.x + "," + start.y + " ";
    const x = labelDirection === "ltr" ? stop.x + getLength(start, stop) : stop.x - getLength(start, stop);
    const y = stop.y;
    var finalStop = { x: x, y: y };
    pathD += "L" + stop.x + "," + stop.y + " ";
    var linePathD = pathD + "H" + finalStop.x;
    var textPathD = pathD + "H" + finalStop.x + 100;

    console.log("final stop", finalStop);

    setPathD(linePathD);
    // setTextPathD(textPathD);
    setDest(finalStop);
  }, [start, stop]);

  useEffect(() => {
    if (dataRef && dataRef.current && dest) {
      console.log(dataRef.current);
      const charCount = data
        .split(",")
        .map((str) => Array.from(str).length)
        .reduce((acc, cur) => acc + cur, 0);
      dataRef.current.style.transform = `translate(${dest.x}px, ${dest.y}px)`;
    }
  }, [data, data.length, dataRef, dest]);

  return (
    <Fragment>
      {visible && pathD && (
        <Fragment>
          <svg width={width} height={"100%"} style={style} fill={backgroundColor} data_id={"curved-path"}>
            <defs>
              <marker ref={markerNode} id="arrow">
                <path d={pathD} style={{ fill: { color } }} />
              </marker>
            </defs>
            <path ref={markerEndNode} d={pathD} style={{ stroke: color, strokeWidth: "1.25px", fill: "none" }} />
            <text ref={dataRef} fill={"black"} fontSize={"5px"}>
              {data}
            </text>
          </svg>
        </Fragment>
      )}
    </Fragment>
  );
};

export default CurveArrowedLine;
