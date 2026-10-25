import { useCallback, useEffect, useState } from 'react';

export default function useFetch(url, retries = 3, baseDelay = 500) {
  const [state, setState] = useState({ data: null, error: null, status: 'idle', attempt: 0 });
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    if (!url) return;

    const controller = new AbortController();
    let timer = null;

    function wait(ms) {
      return new Promise(resolve => {
        timer = setTimeout(resolve, ms);
      });
    }

    async function load() {
      for (let attempt = 1; attempt <= retries + 1; attempt++) {
        setState(s => ({ ...s, status: 'loading', error: null, attempt }));
        try {
          const res = await fetch(url, { signal: controller.signal });
          if (!res.ok) {
            const err = new Error('Request failed with status ' + res.status);
            err.status = res.status;
            throw err;
          }
          const data = await res.json();
          setState({ data, error: null, status: 'success', attempt });
          return;
        } catch (err) {
          if (controller.signal.aborted) return;
          const canRetry = (!err.status || err.status >= 500) && attempt <= retries;
          if (!canRetry) {
            setState({ data: null, error: err, status: 'error', attempt });
            return;
          }
          await wait(baseDelay * 2 ** (attempt - 1));
          if (controller.signal.aborted) return;
        }
      }
    }

    load();

    return () => {
      controller.abort();
      clearTimeout(timer);
    };
  }, [url, retries, baseDelay, reloadKey]);

  const refetch = useCallback(() => setReloadKey(k => k + 1), []);

  return { ...state, refetch };
}
