import { useMemo, useEffect, useState } from "react";
import generateBars from "../Generators/Bars";

const useInitializeBars = (color, num) => {
  // const [bars, setBars] = useState([]);
  // useEffect(() => {
  //   const getBars = async () => {
  //     const bars = await generateBars(color, num);
  //     setBars(bars);
  //   };
  //   getBars();
  // });
  // return [bars];
  const bars = useMemo(() => generateBars(color, num), [color, num]);
  return bars;
};

export default useInitializeBars;
