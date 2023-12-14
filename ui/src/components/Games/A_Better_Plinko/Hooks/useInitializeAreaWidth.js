import { useMemo } from "react";
import config from "../Config";

const useInitializeAreaWidth = (slots) => {
  const barsSectionWidth = config.barsSectionWidth;
  const barWidth = config.barWidth;

  return useMemo(() => {
    return slots === 0 ? 0 : (barsSectionWidth - slots * barWidth) / slots;
  }, [barWidth, barsSectionWidth, slots]);
};
export default useInitializeAreaWidth;
