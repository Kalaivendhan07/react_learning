import { useRef, useState } from 'react';
import useInterval from '../../shared/useInterval';
import formatTime from './formatTime';

export default function HookStopwatch() {
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const startedAt = useRef(0);

  useInterval(() => {
    setElapsed(Date.now() - startedAt.current);
  }, running ? 100 : null);

  function toggle() {
    if (!running) startedAt.current = Date.now() - elapsed;
    setRunning(!running);
  }

  function reset() {
    setRunning(false);
    setElapsed(0);
    setLaps([]);
  }

  return (
    <div className="watch">
      <h3>Hooks version</h3>
      <p className="watch-time">{formatTime(elapsed)}</p>
      <div className="watch-buttons">
        <button onClick={toggle}>{running ? 'Pause' : elapsed > 0 ? 'Resume' : 'Start'}</button>
        <button onClick={() => setLaps([...laps, elapsed])} disabled={!running}>Lap</button>
        <button onClick={reset}>Reset</button>
      </div>
      <ol className="watch-laps">
        {laps.map((lap, i) => <li key={i}>{formatTime(lap)}</li>)}
      </ol>
    </div>
  );
}
