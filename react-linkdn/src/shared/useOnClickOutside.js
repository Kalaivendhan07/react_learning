import { useEffect } from 'react';

export default function useOnClickOutside(ref, otherRef, handler, enabled = true) {
  useEffect(() => {
    if (!enabled) return;

    function isInside(r, target) {
      return r && r.current && r.current.contains(target);
    }

    function onPointerDown(e) {
      if (isInside(ref, e.target) || isInside(otherRef, e.target)) return;
      handler(e);
    }

    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [ref, otherRef, handler, enabled]);
}
