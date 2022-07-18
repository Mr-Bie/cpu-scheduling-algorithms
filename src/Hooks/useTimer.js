import { useCallback, useState } from "react";
import interval from "../Comps/interval";

const use1Second = interval(1000);

export const useTimer = () => {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const [ticked, setTick] = useState(false);

  const tick = useCallback(() => {
    if (running) {
      setSeconds((seconds) => seconds + 1);
      setTick((state) => !state);
    }
  }, [running]);

  const start = () => setRunning(true);
  const pause = () => setRunning(false);
  const reset = () => {
    pause();
    setSeconds(0);
  };

  use1Second(tick);

  return {
    pause,
    reset,
    running,
    seconds,
    start,
    ticked,
    setRunning,
    setSeconds,
  };
};
