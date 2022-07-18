// Dependencies
import { useState, useEffect, useRef } from "react";

// Components
import Process from "../../Comps/Processes/Process/Process";
import createProcessors from "../../Comps/createProcessors";
import processScheduler from "../Timer/processScheduler";

// Assets
import "./Processes.module.css";

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
}) {
  const [processes, setProcesses] = useState(() => createProcessors());
  const [quantum, setQuantum] = useState(algo === "RR" ? QUANTUM : 0);
  const [scheduledProcesses, setScheduledProcesses] = useState(
    processScheduler(algo, processes, seconds, quantum)
  );

  const changeProcessButtonClick = () => {
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
    <div className="App">
      {(!seconds || !running) && (
        <button onClick={(event) => changeProcessButtonClick(event)}>
          Change Processes
        </button>
      )}
      <table>
        <tbody key={-1}>
          <tr>
            <th>Index</th>
            <th>Burst Time</th>
            <th>Arrive Time</th>
            <th>Remaining Time</th>
            <th>Finished Time</th>
            <th>Waiting Time</th>
            <th>Turnaround Time</th>
            <th>Priority</th>
          </tr>
        </tbody>
        {processes.map((v, i) => (
          <tbody key={i}>
            <tr>
              <th>{i}</th>
              <th>{v.burstTime}</th>
              <th>{v.arriveTime}</th>
              <th>{v.remainingTime}</th>
              <th>{v.finished ? v.finishedTime : "?"}</th>
              <th>
                {v.finished ? v.finishedTime - v.arriveTime - v.burstTime : "?"}
              </th>
              <th>{v.finished ? v.finishedTime - v.arriveTime : "?"}</th>
              <th>{v.priority}</th>
            </tr>
          </tbody>
        ))}
      </table>
      {finished ? (
        <div>All processes finished successfully!</div>
      ) : (
        <div>
          {processes.map((v, i) => (
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
  );
}

export default Processes;
