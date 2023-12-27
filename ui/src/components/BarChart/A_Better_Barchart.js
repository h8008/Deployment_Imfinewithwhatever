import * as d3 from "d3";
import { useEffect, useRef } from "react";
import "./BarChart.css";

import useGetWindowSize from "../../hooks/useGetWindowSize";

const Barchart = (props) => {
  const { chartData: data, height, width } = props;
  const ref = useRef();
  const windowSize = useGetWindowSize();

  console.log("bar chart data", data);

  useEffect(() => {
    const windowWidth = window.innerWidth / 2;

    // set the dimensions and margins of the graph
    const margin = { top: 30, right: 30, bottom: 70, left: 30 },
      width = windowWidth - margin.left - margin.right,
      height = 250 - margin.top - margin.bottom;

    d3.forceCenter(0, 0);

    // append the svg object to the body of the page
    const svg = d3
      .select(ref.current)
      .append("svg")
      .classed("svg-content-responsive", true)
      .attr("transform", `translate(${0} , ${margin.top * 3})`)
      // .attr("width", width + margin.left + margin.right)
      .attr("width", width)
      .attr("height", height + margin.top + margin.bottom)
      .attr("color", "white")
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const x = d3
      .scaleBand()
      .range([0, width - 50])
      .domain(data.map((d) => d.name))
      .padding(0.2);

    console.log("width", width);

    svg
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .attr("width", "80%")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("transform", `translate(${x.bandwidth() / 12}, ${20})rotate(45)`);

    // Add Y axis
    const y = d3.scaleLinear().domain([0, data[0].data]).range([height, 0]);
    svg.append("g").call(d3.axisLeft(y)).selectAll("text").attr("color", "black");

    // Bars
    svg
      .selectAll("mybar")
      .data(data)
      .join("rect")
      .attr("x", (d) => x(d.name))
      .attr("y", (d) => y(d.data))
      .attr("width", x.bandwidth() / 2)
      .attr("height", (d) => height - y(d.data))
      .attr("fill", "white")
      .attr("transform", `translate(${x.bandwidth() / 4}, 0)`);
  }, [data]);

  return (
    <div
      id="barchart"
      ref={ref}
      style={{
        height: "fit-content",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "auto",
        position: "relative",
      }}
      // style={{ display: "inline-block", position: "relative", height: height, width: width }}
    />
  );
};

export default Barchart;
