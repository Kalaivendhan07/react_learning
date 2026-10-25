import { useCallback, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import useOnClickOutside from '../../shared/useOnClickOutside';

export default function Dropdown({ label, items }) {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef(null);
  const menuRef = useRef(null);
  const close = useCallback(() => setOpen(false), []);
  useOnClickOutside(triggerRef, menuRef, close, open);

  function toggle() {
    const box = triggerRef.current.getBoundingClientRect();
    setPosition({ top: box.bottom + window.scrollY + 4, left: box.left + window.scrollX });
    setOpen(!open);
  }

  function focusItem(step) {
    const buttons = [...menuRef.current.querySelectorAll('button')];
    const index = buttons.indexOf(document.activeElement);
    const next = (index + step + buttons.length) % buttons.length;
    buttons[next].focus();
  }

  function handleKeyDown(e) {
    if (e.key === 'Escape') {
      setOpen(false);
      triggerRef.current.focus();
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      focusItem(1);
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      focusItem(-1);
    }
  }

  return (
    <>
      <button ref={triggerRef} onClick={toggle} aria-haspopup="menu" aria-expanded={open}>
        {label} ▾
      </button>
      {open &&
        createPortal(
          <div
            ref={menuRef}
            className="dd-menu"
            role="menu"
            style={{ top: position.top, left: position.left }}
            onKeyDown={handleKeyDown}
          >
            {items.map(item => (
              <button key={item.label} role="menuitem" onClick={item.onClick}>
                {item.label}
              </button>
            ))}
          </div>,
          document.body
        )}
    </>
  );
}
