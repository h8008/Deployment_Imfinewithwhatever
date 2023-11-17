import { useEffect, useState } from "react";

const useDetectRefresh = () => {
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    window.addEventListener("beforeunload", setRefresh(true));
    return () => {
      window.removeEventListener("beforeunload", setRefresh(false));
    };
  }, []);

  return [refresh];
};

export default useDetectRefresh;
