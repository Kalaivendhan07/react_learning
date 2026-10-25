import { useEffect, useRef } from 'react';

export default function useInfiniteScroll(onLoadMore, enabled) {
  const sentinelRef = useRef(null);

  useEffect(() => {
    if (!enabled || !sentinelRef.current) return;

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) onLoadMore();
      },
      { rootMargin: '300px' }
    );

    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [onLoadMore, enabled]);

  return sentinelRef;
}
