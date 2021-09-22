import React from "react";
import "@ionic/react/css/core.css";
import { IonButton } from "@ionic/react";

// /* Core CSS required for Ionic components to work properly */
// import '@ionic/react/css/core.css'

// /* Basic CSS for apps built with Ionic */
// import '@ionic/react/css/normalize.css'
// import '@ionic/react/css/structure.css'
// import '@ionic/react/css/typography.css'

// /* Optional CSS utils that can be commented out */
// import '@ionic/react/css/padding.css'
// import '@ionic/react/css/float-elements.css'
// import '@ionic/react/css/text-alignment.css'
// import '@ionic/react/css/text-transformation.css'
// import '@ionic/react/css/flex-utils.css'
// import '@ionic/react/css/display.css'

// /* Theme variables */
// import 'theme/variables.css'
// import 'theme/styles.css'

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
        {!timerOn && time === 0 && <IonButton onClick={() => setTimeOn(true)}>Start</IonButton>}
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

