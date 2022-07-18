export default () => {
  const processCount = Math.floor(Math.random() * 10 + 1);
  let processes = Array(processCount);
  for (let i = 0; i < processes.length; i++) {
    const processTime = Math.floor(Math.random() * 10) + 1;
    processes[i] = {
      id: i,
      processTime,
      remainingTime: processTime,
      arriveTime: Math.floor(Math.random() * 5) + 1,
      finished: false,
      finishedTime: -1,
      priority: Math.floor(Math.random() * 3),
    };
  }
  processes[Math.floor(Math.random() * processCount)].arriveTime = 0;
  return processes;
};
