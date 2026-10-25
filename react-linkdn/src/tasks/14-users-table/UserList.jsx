import { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { filterUsers } from './users';

const SORTS = ['name', 'email', 'role', 'city'];
const SIZES = [10, 20, 50];
const DEFAULTS = { q: '', sort: 'name', dir: 'asc', page: '1', size: '10' };

export default function UserList() {
  const [params, setParams] = useSearchParams();
  const q = String(params.get('q') || '');
  const sortParam = String(params.get('sort'));
  const sort = SORTS.includes(sortParam) ? sortParam : 'name';
  const dir = params.get('dir') === 'desc' ? 'desc' : 'asc';
  const page = Math.max(1, parseInt(params.get('page')) || 1);
  const size = SIZES.includes(Number(params.get('size'))) ? Number(params.get('size')) : 10;

  function update(changes, replace = false) {
    const next = { q, sort, dir, page: String(page), size: String(size), ...changes };
    const clean = {};
    Object.keys(next).forEach(key => {
      if (String(next[key]) !== DEFAULTS[key]) clean[key] = next[key];
    });
    setParams(clean, { replace });
  }

  const filtered = useMemo(() => filterUsers(q, sort, dir), [q, sort, dir]);

  const lastPage = Math.max(1, Math.ceil(filtered.length / size));
  const currentPage = Math.min(page, lastPage);
  const rows = filtered.slice((currentPage - 1) * size, currentPage * size);

  function sortBy(column) {
    if (column === sort) update({ dir: dir === 'asc' ? 'desc' : 'asc', page: 1 });
    else update({ sort: column, dir: 'asc', page: 1 });
  }

  return (
    <div className="users">
      <div className="users-tools">
        <input value={q} onChange={e => update({ q: e.target.value, page: 1 }, true)} placeholder="Search name, email or city" />
        <select value={size} onChange={e => update({ size: e.target.value, page: 1 })}>
          {SIZES.map(s => <option key={s} value={s}>{s} per page</option>)}
        </select>
      </div>

      <table className="users-table">
        <thead>
          <tr>
            {SORTS.map(col => (
              <th key={col}>
                <button onClick={() => sortBy(col)}>
                  {col} {sort === col ? (dir === 'asc' ? '▲' : '▼') : ''}
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 && (
            <tr>
              <td colSpan={4} className="users-empty">No user matches</td>
            </tr>
          )}
          {rows.map(user => (
            <tr key={user.id}>
              <td><Link to={String(user.id) + '?' + params.toString()}>{user.name}</Link></td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.city}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="users-pager">
        <button disabled={currentPage === 1} onClick={() => update({ page: currentPage - 1 })}>Prev</button>
        <span>Page {currentPage} of {lastPage} ({filtered.length} users)</span>
        <button disabled={currentPage === lastPage} onClick={() => update({ page: currentPage + 1 })}>Next</button>
      </div>
    </div>
  );
}
