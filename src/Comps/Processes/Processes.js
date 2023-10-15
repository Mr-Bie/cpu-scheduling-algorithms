// Dependencies
import { useState, useEffect, useRef } from "react";

// Components
import Process from "../../Comps/Processes/Process/Process";
import createProcessors from "../../Comps/createProcessors";
import processScheduler from "../Timer/processScheduler";

// Constraints
const QUANTUM = 3;

function Processes({
  algo,
  seconds,
  running,
  ticked,
  finished,
  stopRunning,
  setFinished,
  setSeconds,
  changeAlgo
}) {
  const [processes, setProcesses] = useState(() => createProcessors());
  const [quantum, setQuantum] = useState(algo === "RR" ? QUANTUM : 0);
  const [scheduledProcesses, setScheduledProcesses] = useState(
    processScheduler(algo, processes, seconds, quantum)
  );

  const changeProcessButtonClick = () => {
    stopRunning();
    setProcesses(() => createProcessors());
    setFinished(false);
    setSeconds(0);
  };

  const setProcessFinished = (id) => {
    setProcesses((state) => {
      let newState = [...state];
      newState[id].finished = true;
      newState[id].finishedTime = seconds;
      return newState;
    });
  };
  const setProcessRemainingTime = (id, remainingTime) => {
    setProcesses((state) => {
      let newState = [...state];
      newState[id].remainingTime = remainingTime >= 0 ? remainingTime : 0;
      return newState;
    });
  };

  useEffect(() => {
    setScheduledProcesses(processScheduler(algo, processes, seconds, quantum));
  }, [processes]);

  /*useEffect(() => {
  }, [scheduledProcesses]);*/

  useEffect(() => {
    if (
      processes.filter((v) => v.finished === true).length === processes.length
    ) {
      setFinished(true);
      stopRunning(false);
    }
  }, [processes]);

  return (
    <div className="flex-1 w-full h-full flex flex-col items-center">
      <div className={`flex-1 w-full h-full flex ${finished ? "flex-col" : "flex-row"} justify-between items-center gap-8`}>
        <table className="border-separate border-spacing-x-4 border-spacing-y-2 table-auto text-white p-2">
          <tbody key={-1}>
            <tr className="border-b border-gray">
              <th>Index</th>
              <th>Burst Time</th>
              <th>Arrive Time</th>
              <th>Remaining Time</th>
              {
                finished && (
                  <>
                    <th>Finished Time</th>
                    <th>Waiting Time</th>
                    <th>Turnaround Time</th>
                  </>
                )
              }
              <th>Priority</th>
            </tr>
          </tbody>
          {processes.map((v, i) => (
            <tbody key={i}>
              <tr>
                <th>{i}</th>
                <th>{v.burstTime}</th>
                <th>{v.arriveTime}</th>
                <th>{v.remainingTime}</th>{ finished && 
                (<>
                  <th>{v.finished ? v.finishedTime : "?"}</th>
                  <th>
                  {v.finished ? v.finishedTime - v.arriveTime - v.burstTime : "?"}
                  </th>
                  <th>{v.finished ? v.finishedTime - v.arriveTime : "?"}</th>
                </>)}
                <th>{v.priority}</th>
              </tr>
            </tbody>
          ))}
        </table>
        {finished ? (
          <div className="my-auto text-white text-lg font-bold">All processes finished successfully!</div>
        ) : (
          <div className="min-w-[50vw] flex flex-col gap-4">
            {!finished && processes.map((v, i) => (
              <Process
                seconds={seconds}
                id={v.id}
                burstTime={v.burstTime}
                processRemainingTime={v.remainingTime}
                arriveTime={v.arriveTime}
                finished={v.finished}
                tick={ticked}
                nextProcess={scheduledProcesses[0]}
                running={running}
                setProcesses={setProcesses}
                setProcessFinished={() => {
                  setProcessFinished(i);
                }}
                setProcessRemainingTime={(remainingTime) => {
                  setProcessRemainingTime(i, remainingTime);
                }}
                id={i}
                key={i}
              />
            ))}
          </div>
        )}
      </div>
      <div className="flex flex-row gap-4">
        <button
          className="text-white border-solid border-white border-2 py-2 px-8 rounded-md min-w-fit w-40 hover:text-darkBlue hover:bg-white hover:scale-110 transition-all duration-100 disabled:hover:scale-100 disabled:hover:bg-darkBlue disabled:text-gray disabled:opacity-50" 
          onClick={(event) => changeProcessButtonClick(event)}
          disabled={seconds && running}
          >
          Change Processes
        </button>
        <button
        className="text-white border-solid border-white border-2 py-2 px-8 rounded-md min-w-fit w-40 hover:text-darkBlue hover:bg-white hover:scale-110 transition-all duration-100"
        onClick={changeAlgo}
        disabled={seconds && running}
        >Change Algorithm</button>
      </div>
    </div>
  );
}

export default Processes;
