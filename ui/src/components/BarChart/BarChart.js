import { useRef, useEffect } from "react";
import * as d3 from "d3";
import rd3 from "react-d3-library";
import node from "d3file";
import { height } from "@mui/system";
const RD3Component = rd3.Component;

const BarChart = (props) => {
  const ref = useRef();
  const { data, width, height } = props;

  useEffect(() => {
    const svg = d3
      .select(ref.current)
      .append("svg")
      //   .attr("width", width + margin.left + margin.right)
      //   .attr("height", height + margin.top + margin.bottom)
      .attr("width")
      .attr("height")
      .append("g");
    //   .attr("transform", `translate(${margin.left},${margin.top})`);
    const x = d3
      .scaleBand()
      .range([0, width])
      .domain(data.map((d) => d.reviews))
      .padding(0.2);

    svg
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    // Add Y axis
    const y = d3.scaleLinear().domain([0, 13000]).range([height, 0]);
    svg.append("g").call(d3.axisLeft(y));
  }, []);

  return <svg width={width} height={height} id="barchart" ref={ref} />;
};

export default BarChart;
