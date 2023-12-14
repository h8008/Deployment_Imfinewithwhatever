import { useMemo } from "react";
import generatePins from "../Generators/Pins";

const useInitializePins = (color) => {
  const pins = useMemo(() => generatePins(color), [color]);
  return pins;
};

// const useInitializePins = (color) => {
//     const [pins, setPins] = useState([]);

//     useEffect(() => {
//       const getPins = async () => {
//         const pins = await generatePins(color);
//         setPins(pins);
//       };
//       getPins();
//     }, [color]);

//     return [pins];
//   };

export default useInitializePins;
