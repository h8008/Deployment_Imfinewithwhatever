import { useMemo } from "react";

const useInitializeSlots = (num) => {
  const slots = useMemo(() => num, [num]);
  return slots;
};

export default useInitializeSlots;
