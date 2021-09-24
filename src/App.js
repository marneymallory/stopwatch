import React from "react";
import "@ionic/react/css/core.css";
import { IonButton } from "@ionic/react";
import "./core.css";

function App() {
  
  const [time, setTime] = React.useState(0);
  const [timerOn, setTimeOn] = React.useState(false);
  const [laps, setLaps] = React.useState([]);

  React.useEffect(() => {
    let interval = null;

    if (timerOn) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerOn]);

  const recordLap = () => {
    const previousLapsTotal = laps.reduce(
      (lastAddedLap, currentValue) => lastAddedLap + currentValue,
      0
    );
    const currentLap = time - previousLapsTotal;
    const newLaps = [...laps, currentLap];
    setLaps(newLaps);
  };

  return (
    <div className="App">
      <div className="numbers">
        <h2> A Stopwatch </h2>
        <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
        <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
        <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
      </div>
      <div>
        {!timerOn && time === 0 && (
          <IonButton onClick={() => setTimeOn(true)}>Start</IonButton>
        )}
        {timerOn && (
          <>
            <IonButton onClick={() => setTimeOn(false)}>Stop</IonButton>
            <IonButton onClick={() => recordLap()}>Lap</IonButton>
          </>
        )}
        {!timerOn && time !== 0 && (
          <IonButton onClick={() => setTimeOn(true)}>Resume</IonButton>
        )}
        {!timerOn && time > 0 && (
          <>
            <IonButton onClick={() => (setTime(0), setLaps([]))}>Reset</IonButton>
            <IonButton onClick={() => recordLap()}>Lap</IonButton>
          </>
        )}
        <ul className="lapList">
          {laps.map((lap, index) => {
            return (
              <li>
                {`${index + 1}.`}
                {("0" + Math.floor((lap / 60000) % 60)).slice(-2)}:
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
