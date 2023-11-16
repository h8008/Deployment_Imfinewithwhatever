import { useEffect, useState } from "react";

const useDetectRefresh = () => {
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    window.addEventListener("beforeunload", setRefresh);
    return () => {
      window.removeEventListener("beforeunload", setRefresh);
    };
  }, []);

  return [refresh];
};

export default useDetectRefresh;
