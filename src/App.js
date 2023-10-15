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

  const changeAlgo = () => window.location.reload(false);

  const restart = () => changeAlgo();

  return (
    <div className="flex w-screen h-screen">
      {!algo ? (
        <div className="flex flex-col justify-center items-center gap-4 w-full h-screen">
          <button className="text-white border-solid border-white border-2 py-1 px-8 rounded-md w-40 hover:text-darkBlue hover:bg-white hover:scale-110 transition-all duration-100" onClick={chooseAlgo} value={"FCFS"}>
            FCFS
          </button>
          <button className="text-white border-solid border-white border-2 py-1 px-8 rounded-md w-40 hover:text-darkBlue hover:bg-white hover:scale-110 transition-all duration-100" onClick={chooseAlgo} value={"SJF"}>
            SJF
          </button>
          <button className="text-white border-solid border-white border-2 py-1 px-8 rounded-md w-40 hover:text-darkBlue hover:bg-white hover:scale-110 transition-all duration-100" onClick={chooseAlgo} value={"SRT"}>
            SRT
          </button>
          <button className="text-white border-solid border-white border-2 py-1 px-8 rounded-md w-40 hover:text-darkBlue hover:bg-white hover:scale-110 transition-all duration-100" onClick={chooseAlgo} value={"PR"}>
            Priority
          </button>
          <button className="text-white border-solid border-white border-2 py-1 px-8 rounded-md w-40 hover:text-darkBlue hover:bg-white hover:scale-110 transition-all duration-100" onClick={chooseAlgo} value={"RR"}>
            Round Robin
          </button>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center w-full p-4">
          <Timer
            start={start}
            stop={pause}
            seconds={seconds}
            running={running}
            finished={finished}
            restart={restart}
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
            changeAlgo={changeAlgo}
          />
        </div>
      )}
    </div>
  );
}

export default App;
