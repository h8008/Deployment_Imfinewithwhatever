import { useState, useEffect, useCallback } from "react";

const useGetWindowSize = (props) => {
  const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  const logSize = useCallback((event) => {
    // console.log("new width", window.innerWidth);
    setSize({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  useEffect(() => {
    window.addEventListener("resize", logSize);
    return () => {
      window.removeEventListener("resize", logSize);
    };
  }, [logSize]);

  return size;
};

export default useGetWindowSize;
