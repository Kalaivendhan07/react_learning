import ClassStopwatch from './ClassStopwatch';
import HookStopwatch from './HookStopwatch';
import './style.css';

export default function Stopwatch() {
  return (
    <div className="watch-page">
      <ClassStopwatch />
      <HookStopwatch />
    </div>
  );
}
