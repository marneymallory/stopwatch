import React from "react";
import './App.css';

function App() {
  const [time, setTime] = React.useState(0)
  const [timerOn, setTimeOn] = React.useState(false)
  const [laps, setLaps] = React.useState([])

  const recordLap = () => {
    const previousLapsTotal = laps.reduce(
      (addedLap, currentValue) => addedLap + currentValue, 0
    )
    const currentLap = time - previousLapsTotal;
    const newLaps = [...laps, currentLap]
    setLaps(newLaps)
  }

  React.useEffect(() => {
    let interval = null;

    if(timerOn) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 10)
      }, 10)
    } else {
      clearInterval(interval)
    }
    return () => clearInterval(interval)
    
  }, [timerOn])
  let lapCounter = 1;
  const lapDisplay = () => {
    let string = lapCounter + ".";
    lapCounter++;
    return string;
  }

  return (
    <div className="App">
      <div className="numbers">
        <h2> A Stopwatch </h2>
        <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
        <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
        <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
      </div>
      <div>
        {!timerOn && time === 0 && <button onClick={() => setTimeOn(true)}>Start</button>}
        {timerOn && (
          <>
            <button onClick={() => setTimeOn(false)}>Stop</button>
            <button onClick={() => recordLap()}>Lap</button>
          </>
        )}
        {!timerOn && time !== 0 && (
          <button onClick={() => setTimeOn(true)}>Resume</button>
        )}
        {!timerOn && time > 0 && (
          <>
            <button onClick={() => (setTime(0), setLaps([]))}>Reset</button>
            <button onClick={() => recordLap()}>Lap</button>
          </>
        )}
        <ul className="lapList">
          {laps.map((lap) => {
            return (
              <li>
                {lapDisplay()} {("0" + Math.floor((lap / 60000) % 60)).slice(-2)}:
                {("0" + Math.floor((lap / 1000) % 60)).slice(-2)}:
                {("0" + ((lap / 10) % 100)).slice(-2)}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
