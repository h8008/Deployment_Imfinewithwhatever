import { path } from "d3";
import { Component, findDOMNode, useEffect, useRef } from "react";

// export default class CurveArrowedLine extends Component {
//   componentDidMount() {
//     var markerNode = findDOMNode(this.refs.marker);
//     var markerEndNode = findDOMNode(this.refs.markerEndNode);

//     markerNode.setAttribute("markerWidth", 13);
//     markerNode.setAttribute("markerHeight", 13);
//     markerNode.setAttribute("refx", 2);
//     markerNode.setAttribute("refy", 6);
//   }
//   render() {
//     var style = {
//       position: "absolute",
//       zIndex: 200,
//     };

//     var path_d = "M" + this.props.start.x + "," + this.props.start.y + " ";
//     path_d += "L" + this.props.stop.x + "," + this.props.stop.y;

//     return (
//       <svg width="300" height="100" style={style}>
//         <defs>
//           <marker ref="marker" id="arrow">
//             <path d="M2,1 L2,10 L10,6 L2,2" style={{ fill: "red" }} />
//             {/* <path d={path_d} style={{ fill: "red" }} /> */}
//           </marker>
//         </defs>

//         <path
//           ref={"markerEndNode"}
//           d="M30,150 L100,50"
//           style={{ stroke: "red", strokeWidth: "1.25px", fill: "none" }}
//         />
//       </svg>
//     );
//   }
// }

const getLength = (src, dest) => {
  return Math.sqrt(Math.pow(src.x - dest.x, 2) + Math.pow(dest.y - src.y, 2));
};

const CurveArrowedLine = (props) => {
  const markerNode = useRef(null);
  const markerEndNode = useRef(null);
  const { start, stop } = props;

  var style = {
    position: "absolute",
    zIndex: 3,
  };

  var pathD = "M" + start.x + "," + start.y + " ";
  pathD += "L" + stop.x + "," + stop.y;
  pathD += "H" + (stop.x - getLength(start, stop));

  console.log("path", pathD);

  return (
    <svg width="1500" height="200" style={style}>
      <defs>
        <marker ref={markerNode} id="arrow">
          <path d={pathD} style={{ fill: "black" }} />
        </marker>
      </defs>

      <path ref={markerEndNode} d={pathD} style={{ stroke: "red", strokeWidth: "1.25px", fill: "none" }} />
    </svg>
  );
};

export default CurveArrowedLine;
