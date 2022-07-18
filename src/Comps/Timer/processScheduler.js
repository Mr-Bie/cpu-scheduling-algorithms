export default (algo, processes, seconds, quantum) => {
  const unFinishedArrivedProcesses = processes.filter(
    (v) => !v.finished && seconds >= v.arriveTime
  );
  console.log(unFinishedArrivedProcesses);
  let processesToExecute = [];
  switch (algo) {
    case "SJF": {
      unFinishedArrivedProcesses
        .sort((a, b) => a.processTime - b.processTime)
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
        .filter((v) => (v.processTime - v.remainingTime) % quantum)
        .sort((a, b) => a.remainingTime - b.remainingTime);
      console.log(processesToExecute);
      if (!processesToExecute.length)
        processesToExecute = unFinishedArrivedProcesses.sort((a, b) => {
          if (
            a.processTime - a.remainingTime ===
            b.processTime - b.remainingTime
          ) {
            return a.remainingTime - b.remainingTime;
          } else {
            return (
              a.processTime -
              a.remainingTime -
              (b.processTime - b.remainingTime)
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
  console.log(processesToExecute);
  return processesToExecute;
};
