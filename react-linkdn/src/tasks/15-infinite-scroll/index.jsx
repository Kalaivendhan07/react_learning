import { useCallback, useRef, useState } from 'react';
import useInfiniteScroll from './useInfiniteScroll';
import useScrollProgress from './useScrollProgress';
import { fetchProduce } from './produce';
import './style.css';

const PAGE_SIZE = 10;

export default function InfiniteScroll() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [hasMore, setHasMore] = useState(true);
  const loadingRef = useRef(false);
  const skipRef = useRef(0);
  const progress = useScrollProgress();

  const loadMore = useCallback(async () => {
    if (loadingRef.current) return;
    loadingRef.current = true;
    setLoading(true);
    setError('');
    try {
      const data = await fetchProduce(skipRef.current, PAGE_SIZE);
      skipRef.current += data.items.length;
      setItems(list => [...list, ...data.items]);
      setHasMore(skipRef.current < data.total);
    } catch (err) {
      setError(err.message);
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  }, []);

  const sentinelRef = useInfiniteScroll(loadMore, hasMore && !error && !loading);

  return (
    <div className="feed">
      <div className="feed-progress" style={{ width: progress + '%' }}></div>

      {items.map(item => (
        <article key={item.id} className="feed-card">
          <span className="feed-icon" role="img" aria-label={item.name}>{item.icon}</span>
          <div>
            <h3>{item.name} <span className={'feed-tag ' + item.type.toLowerCase()}>{item.type}</span></h3>
            <p>{item.tamil}</p>
            <b>₹{item.price} / kg</b>
          </div>
        </article>
      ))}

      {loading && <p className="feed-info">Loading...</p>}
      {error && (
        <p className="feed-info">
          {error} <button onClick={loadMore}>Retry</button>
        </p>
      )}
      {!hasMore && <p className="feed-info">You reached the end</p>}

      <div ref={sentinelRef} className="feed-sentinel"></div>

      {progress > 10 && (
        <button className="feed-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          ↑ Top
        </button>
      )}
    </div>
  );
}
