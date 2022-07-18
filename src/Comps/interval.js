import { useEffect } from "react";

export default (delay = 0) =>
  (callback) =>
    useEffect(() => {
      const id = setInterval(callback, delay);
      return () => clearInterval(id);
    }, [callback]);
