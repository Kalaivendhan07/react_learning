import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

export default function Modal({ title, onClose, children }) {
  const boxRef = useRef(null);

  useEffect(() => {
    const opener = document.activeElement;
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const first = boxRef.current.querySelector('button, input, a');
    if (first) first.focus();

    return () => {
      document.body.style.overflow = oldOverflow;
      if (opener) opener.focus();
    };
  }, []);

  function handleKeyDown(e) {
    if (e.key === 'Escape') onClose();
    if (e.key !== 'Tab') return;

    const items = boxRef.current.querySelectorAll('button, input, a');
    const first = items[0];
    const last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  return createPortal(
    <div className="modal-backdrop" onClick={onClose}>
      <div
        ref={boxRef}
        className="modal-box"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={e => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        <h2 id="modal-title">{title}</h2>
        {children}
      </div>
    </div>,
    document.body
  );
}
