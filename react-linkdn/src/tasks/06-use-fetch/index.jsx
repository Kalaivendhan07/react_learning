import { useState } from 'react';
import useFetch from '../../shared/useFetch';
import './style.css';

const URLS = [
  { label: 'Team (works)', url: '/api/team.json' },
  { label: '404 (no retry)', url: 'https://dummyjson.com/http/404' },
  { label: '500 (retries)', url: 'https://dummyjson.com/http/500' },
  { label: 'Nothing (null)', url: null },
];

export default function UseFetchDemo() {
  const [url, setUrl] = useState(URLS[0].url);
  const { data, error, status, attempt, refetch } = useFetch(url);

  return (
    <div className="fetch">
      <div className="fetch-urls">
        {URLS.map(item => (
          <button key={item.label} className={item.url === url ? 'selected' : ''} onClick={() => setUrl(item.url)}>
            {item.label}
          </button>
        ))}
        <button onClick={refetch} disabled={!url}>Refetch</button>
      </div>

      <p className="fetch-status">
        Status: <b>{url ? status : 'idle'}</b> {url && attempt > 0 && <span>(attempt {attempt})</span>}
      </p>

      {url && status === 'error' && <p className="fetch-error">{error.message}</p>}

      {url && status === 'success' && Array.isArray(data) && (
        <ul className="fetch-list">
          {data.map(user => (
            <li key={user.id}>
              <b>{user.name}</b> ({user.role}) <span>{user.email}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
