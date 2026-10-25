export default function Controls({ onIncrement, onDecrement, onReset, onUndo, onRedo, undoCount, redoCount }) {
  return (
    <div className="counter-controls">
      <button onClick={onDecrement}>- 1</button>
      <button onClick={onIncrement}>+ 1</button>
      <button onClick={onReset}>Reset</button>
      <button onClick={onUndo} disabled={undoCount === 0}>Undo ({undoCount})</button>
      <button onClick={onRedo} disabled={redoCount === 0}>Redo ({redoCount})</button>
    </div>
  );
}
