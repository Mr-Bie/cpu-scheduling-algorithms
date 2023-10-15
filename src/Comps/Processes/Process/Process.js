// Dependencies
import { useEffect, useState } from "react";

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
    <div className="flex flex-row gap-2 max-w-fit">
      <p className="text-white text-sm ">{id}</p>
      <div
      className={`${finished ? "bg-darkBlue text-white" : "bg-white text-darkBlue"} rounded-md flex justify-center transition-all duration-1000`}
      style={{
        width: `${processRemainingTime * 50}px`,
      }}
    >
    </div>
    <p className="text-white">{finished ? "Finished!" : `${processRemainingTime} s`}</p>
    </div>
  );
};

export default Process;
