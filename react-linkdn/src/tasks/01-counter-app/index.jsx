import { useState } from 'react';
import Controls from './Controls';
import HistoryBar from './HistoryBar';
import './style.css';

const LIMIT = 20;

export default function CounterApp() {
  const [history, setHistory] = useState({ past: [], present: 0, future: [] });

  function change(newValue) {
    setHistory(h => {
      if (newValue === h.present) return h;
      return {
        past: [...h.past, h.present].slice(-LIMIT),
        present: newValue,
        future: [],
      };
    });
  }

  function undo() {
    setHistory(h => {
      if (h.past.length === 0) return h;
      return {
        past: h.past.slice(0, -1),
        present: h.past[h.past.length - 1],
        future: [h.present, ...h.future],
      };
    });
  }

  function redo() {
    setHistory(h => {
      if (h.future.length === 0) return h;
      return {
        past: [...h.past, h.present],
        present: h.future[0],
        future: h.future.slice(1),
      };
    });
  }

  return (
    <div className="counter">
      <h2 className="counter-value">{history.present}</h2>
      <Controls
        onIncrement={() => change(history.present + 1)}
        onDecrement={() => change(history.present - 1)}
        onReset={() => change(0)}
        onUndo={undo}
        onRedo={redo}
        undoCount={history.past.length}
        redoCount={history.future.length}
      />
      <HistoryBar past={history.past} present={history.present} future={history.future} />
    </div>
  );
}
