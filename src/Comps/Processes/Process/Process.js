// Dependencies
import { useEffect, useState } from "react";

// Assets
import styles from "./Process.module.css";

const Process = ({
  tick,
  running,
  seconds,
  nextProcess,
  id,
  burstTime,
  processRemainingTime,
  arriveTime,
  finished,
  setProcessFinished,
  setProcessRemainingTime,
}) => {
  useEffect(() => {
    if (running && seconds > arriveTime && nextProcess.id === id)
      if (processRemainingTime - 1 === 0) {
        setProcessFinished();
        setProcessRemainingTime(0);
      } else setProcessRemainingTime(processRemainingTime - 1);
  }, [tick]);

  return (
    <div
      className={styles["container"]}
      style={{
        width: `${processRemainingTime * 50}px`,
        backgroundColor: finished ? "white" : "red",
      }}
    >
      {finished ? "Finished!" : `${processRemainingTime} s`}
    </div>
  );
};

export default Process;
