import { useState } from 'react';

export default function StarRating({ value, defaultValue = 0, onChange, max = 5, readOnly = false, ...rest }) {
  const [inner, setInner] = useState(defaultValue);
  const [hover, setHover] = useState(0);
  const [isControlled] = useState(value !== undefined);

  const current = isControlled ? value : inner;
  const shown = hover || current;

  function choose(n) {
    if (readOnly) return;
    if (!isControlled) setInner(n);
    if (onChange) onChange(n);
  }

  function handleKeyDown(e) {
    if (e.key === 'ArrowRight') choose(Math.min(max, current + 1));
    if (e.key === 'ArrowLeft') choose(Math.max(0, current - 1));
  }

  return (
    <div
      className="stars"
      role="slider"
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={current}
      aria-label="Rating"
      tabIndex={readOnly ? -1 : 0}
      onKeyDown={handleKeyDown}
      onMouseLeave={() => setHover(0)}
      {...rest}
    >
      {Array.from({ length: max }, (_, i) => i + 1).map(n => (
        <span
          key={n}
          className={n <= shown ? 'star on' : 'star'}
          onMouseEnter={() => !readOnly && setHover(n)}
          onClick={() => choose(n)}
        >
          ★
        </span>
      ))}
    </div>
  );
}
