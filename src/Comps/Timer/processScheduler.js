export default (algo, processes, seconds, quantum) => {
  const unFinishedArrivedProcesses = processes.filter(
    (v) => !v.finished && seconds >= v.arriveTime
  );
  let processesToExecute = [];
  switch (algo) {
    case "SJF": {
      unFinishedArrivedProcesses
        .sort((a, b) => a.burstTime - b.burstTime)
        .forEach((v) => {
          for (let i = 0; i < v.remainingTime; i++) processesToExecute.push(v);
        });
      break;
    }
    case "SRT": {
      unFinishedArrivedProcesses
        .sort((a, b) => a.remainingTime - b.remainingTime)
        .forEach((v) => {
          for (let i = 0; i < v.remainingTime; i++) processesToExecute.push(v);
        });
      break;
    }
    case "PR": {
      unFinishedArrivedProcesses
        .sort((a, b) => b.priority - a.priority)
        .forEach((v) => {
          for (let i = 0; i < v.remainingTime; i++) processesToExecute.push(v);
        });
      break;
    }
    case "RR": {
      processesToExecute = unFinishedArrivedProcesses
        .filter((v) => (v.burstTime - v.remainingTime) % quantum)
        .sort((a, b) => a.remainingTime - b.remainingTime);
      if (!processesToExecute.length)
        processesToExecute = unFinishedArrivedProcesses.sort((a, b) => {
          if (a.burstTime - a.remainingTime === b.burstTime - b.remainingTime) {
            return a.remainingTime - b.remainingTime;
          } else {
            return (
              a.burstTime - a.remainingTime - (b.burstTime - b.remainingTime)
            );
          }
        });
      break;
    }
    default: {
      unFinishedArrivedProcesses
        .sort((a, b) => a.arriveTime - b.arriveTime)
        .forEach((v) => {
          for (let i = 0; i < v.remainingTime; i++) processesToExecute.push(v);
        });
    }
  }
  return processesToExecute;
};
