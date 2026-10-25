import { useCallback, useEffect, useRef, useState } from 'react';
import useDebounce from '../../shared/useDebounce';
import useOnClickOutside from '../../shared/useOnClickOutside';
import './style.css';

function Highlight({ text, query }) {
  const index = text.toLowerCase().indexOf(query.toLowerCase());
  if (index === -1 || !query) return text;
  return (
    <>
      {text.slice(0, index)}
      <mark>{text.slice(index, index + query.length)}</mark>
      {text.slice(index + query.length)}
    </>
  );
}

export default function Autocomplete() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [status, setStatus] = useState('idle');
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const [selected, setSelected] = useState(null);
  const [retryKey, setRetryKey] = useState(0);
  const cache = useRef(new Map());
  const boxRef = useRef(null);

  const debounced = useDebounce(query.trim(), 300);

  const close = useCallback(() => setOpen(false), []);
  useOnClickOutside(boxRef, null, close, open);

  useEffect(() => {
    if (debounced === '') return;

    const cached = cache.current.get(debounced);
    if (cached) {
      setResults(cached);
      setStatus('done');
      return;
    }

    const controller = new AbortController();

    async function load() {
      setStatus('loading');
      try {
        const res = await fetch('https://dummyjson.com/products/search?limit=8&q=' + encodeURIComponent(debounced), {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error('Request failed');
        const data = await res.json();
        const names = data.products.map(p => ({ id: p.id, title: p.title }));
        cache.current.set(debounced, names);
        setResults(names);
        setStatus('done');
      } catch (err) {
        if (err.name !== 'AbortError') setStatus('error');
      }
    }

    load();
    return () => controller.abort();
  }, [debounced, retryKey]);

  function choose(item) {
    setSelected(item);
    setQuery(item.title);
    setOpen(false);
  }

  function handleKeyDown(e) {
    if (e.key === 'Escape') setOpen(false);
    if (results.length === 0) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setOpen(true);
      setActive(a => (a + 1) % results.length);
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive(a => (a - 1 + results.length) % results.length);
    }
    if (e.key === 'Enter' && open && results[active]) {
      e.preventDefault();
      choose(results[active]);
    }
  }

  const showList = open && query.trim() !== '';

  return (
    <div className="ac" ref={boxRef}>
      <input
        role="combobox"
        aria-expanded={showList}
        aria-controls="ac-list"
        aria-activedescendant={active >= 0 ? 'ac-option-' + active : undefined}
        value={query}
        placeholder="Search a product..."
        onChange={e => {
          setQuery(e.target.value);
          setOpen(true);
          setActive(-1);
        }}
        onKeyDown={handleKeyDown}
        onBlur={e => {
          if (!boxRef.current.contains(e.relatedTarget)) setOpen(false);
        }}
      />

      {showList && (
        <ul id="ac-list" role="listbox" className="ac-list">
          {status === 'loading' && <li className="ac-info">Loading...</li>}
          {status === 'error' && (
            <li className="ac-info">
              Something went wrong. <button onClick={() => setRetryKey(k => k + 1)}>Retry</button>
            </li>
          )}
          {status === 'done' && results.length === 0 && <li className="ac-info">No results</li>}
          {status === 'done' &&
            results.map((item, i) => (
              <li
                key={item.id}
                id={'ac-option-' + i}
                role="option"
                aria-selected={i === active}
                className={i === active ? 'ac-option active' : 'ac-option'}
                onMouseDown={e => e.preventDefault()}
                onClick={() => choose(item)}
              >
                <Highlight text={item.title} query={query.trim()} />
              </li>
            ))}
        </ul>
      )}

      {selected && <p className="ac-selected">You picked: {selected.title}</p>}
    </div>
  );
}
