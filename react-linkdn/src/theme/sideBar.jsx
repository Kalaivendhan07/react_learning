import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { LEVELS, TASKS } from '../tasks/registry';


export default function Sidebar({ onNavigate }) {
  const [query, setQuery] = useState('');

  const q = query.trim().toLowerCase();
  const visible = TASKS.filter(t => !q || (t.title + ' ' + t.topics).toLowerCase().includes(q));

  return (
    <nav className="sidebar" aria-label="Tasks">
      {/* <NavLink to="/" end onClick={onNavigate} className="side-link">Home</NavLink>
      <input type="search" placeholder="Search tasks…" value={query} onChange={e => setQuery(e.target.value)} /> */}

      {LEVELS.map(level => {
        const list = visible.filter(t => t.level === level.id);
        if (list.length === 0) return null;
        return (
          <section key={level.id}>
            <h2>{level.title}</h2>
            <ul>
              {list.map(t => (
                <li key={t.n}>
                  <NavLink
                    to={t.path}
                    onClick={onNavigate}
                    className={({ isActive }) => (isActive ? 'task-link active' : 'task-link')}
                  >
                    <span className="num">{t.n}</span>
                    <span className="title">{t.title}</span>
                   
                  </NavLink>
                </li>
              ))}
            </ul>
          </section>
        );
      })}

    </nav>
  );
}