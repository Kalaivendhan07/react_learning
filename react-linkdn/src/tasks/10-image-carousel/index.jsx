import { useEffect, useRef, useState } from 'react';
import './style.css';

const SLIDES = [
  { id: 10, caption: 'Forest road' },
  { id: 15, caption: 'Waterfall' },
  { id: 28, caption: 'Green hills' },
  { id: 29, caption: 'Mountain lake' },
  { id: 54, caption: 'Snow peaks' },
];

const INTERVAL = 3000;

export default function ImageCarousel() {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [hovering, setHovering] = useState(false);
  const [tabHidden, setTabHidden] = useState(false);
  const [dragging, setDragging] = useState(false);
  const startX = useRef(0);

  const count = SLIDES.length;
  const paused = !playing || hovering || tabHidden || dragging;

  function goTo(n) {
    setIndex((n + count) % count);
  }

  useEffect(() => {
    if (paused) return;
    const id = setTimeout(() => setIndex(i => (i + 1) % count), INTERVAL);
    return () => clearTimeout(id);
  }, [index, paused, count]);

  useEffect(() => {
    function onVisibility() {
      setTabHidden(document.visibilityState === 'hidden');
    }
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  function handleKeyDown(e) {
    if (e.key === 'ArrowRight') goTo(index + 1);
    if (e.key === 'ArrowLeft') goTo(index - 1);
  }

  function handlePointerDown(e) {
    startX.current = e.clientX;
    setDragging(true);
  }

  function handlePointerUp(e) {
    const diff = e.clientX - startX.current;
    if (diff > 50) goTo(index - 1);
    if (diff < -50) goTo(index + 1);
    setDragging(false);
  }

  function isNear(i) {
    return i === index || i === (index + 1) % count || i === (index - 1 + count) % count;
  }

  return (
    <div
      className="carousel"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => {
        setHovering(false);
        setDragging(false);
      }}
      aria-roledescription="carousel"
    >
      <div className="carousel-window" onPointerDown={handlePointerDown} onPointerUp={handlePointerUp}>
        <div className="carousel-track" style={{ transform: 'translateX(-' + index * 100 + '%)' }}>
          {SLIDES.map((slide, i) => (
            <div className="carousel-slide" key={slide.id} aria-hidden={i !== index}>
              {isNear(i) && (
                <img src={'https://picsum.photos/id/' + slide.id + '/800/400'} alt={slide.caption} draggable="false" />
              )}
              <p className="carousel-caption">{slide.caption}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="carousel-controls">
        <button onClick={() => goTo(index - 1)} aria-label="Previous slide">‹</button>
        <div className="carousel-dots">
          {SLIDES.map((slide, i) => (
            <button
              key={slide.id}
              className={i === index ? 'dot active' : 'dot'}
              onClick={() => goTo(i)}
              aria-label={'Go to slide ' + (i + 1)}
            ></button>
          ))}
        </div>
        <button onClick={() => goTo(index + 1)} aria-label="Next slide">›</button>
        <button onClick={() => setPlaying(!playing)}>{playing ? 'Pause' : 'Play'}</button>
      </div>
    </div>
  );
}
