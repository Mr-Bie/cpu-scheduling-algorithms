// Dependencies
import { useState, useEffect, useCallback } from "react";

// Hook
import { useTimer } from "./Hooks/useTimer";

// Components
import Processes from "./Comps/Processes/Processes";
import Timer from "./Comps/Timer/Timer";

// Assets
import "./App.css";

function App() {
  const { start, pause, seconds, running, ticked, setRunning, setSeconds } =
    useTimer();
  const [finished, setFinished] = useState(false);
  const [algo, setAlgo] = useState();

  const stopRunning = () => setRunning(false);

  const chooseAlgo = (event) => setAlgo(event.target.value.toString());

  return (
    <div className="App">
      {!algo ? (
        <div>
          <button onClick={chooseAlgo} value={"FCFS"}>
            FCFS
          </button>
          <button onClick={chooseAlgo} value={"SJF"}>
            SJF
          </button>
          <button onClick={chooseAlgo} value={"SRT"}>
            SRT
          </button>
          <button onClick={chooseAlgo} value={"PR"}>
            Priority
          </button>
          <button onClick={chooseAlgo} value={"RR"}>
            Round Robin
          </button>
        </div>
      ) : (
        <>
          <Timer
            start={start}
            stop={pause}
            seconds={seconds}
            running={running}
          />
          <Processes
            algo={algo}
            seconds={seconds}
            running={running}
            ticked={ticked}
            finished={finished}
            stopRunning={stopRunning}
            setFinished={setFinished}
            setSeconds={setSeconds}
          />
        </>
      )}
    </div>
  );
}

export default App;
