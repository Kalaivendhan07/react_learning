import { useEffect, useState } from 'react';
import './style.css';

function loadTodos() {
  try {
    const saved = JSON.parse(localStorage.getItem('todos'));
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

const EMPTY_TEXT = {
  all: 'No todos yet. Add one above.',
  active: 'Nothing left to do.',
  done: 'Nothing finished yet.',
};

export default function TodoApp() {
  const [todos, setTodos] = useState(loadTodos);
  const [filter, setFilter] = useState('all');
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  function addTodo(e) {
    e.preventDefault();
    if (text.trim() === '') {
      setError('Please type something');
      return;
    }
    setTodos([...todos, { id: crypto.randomUUID(), text: text.trim(), done: false }]);
    setText('');
    setError('');
  }

  function toggle(id) {
    setTodos(todos.map(t => (t.id === id ? { ...t, done: !t.done } : t)));
  }

  function remove(id) {
    setTodos(todos.filter(t => t.id !== id));
  }

  function clearDone() {
    setTodos(todos.filter(t => !t.done));
  }

  const visibleTodos = todos.filter(t => {
    if (filter === 'active') return !t.done;
    if (filter === 'done') return t.done;
    return true;
  });
  const activeCount = todos.filter(t => !t.done).length;
  const doneCount = todos.length - activeCount;

  return (
    <div className="todo">
      <form onSubmit={addTodo} className="todo-form">
        <input value={text} onChange={e => setText(e.target.value)} placeholder="What needs to be done?" />
        <button type="submit">Add</button>
      </form>
      {error && <p className="todo-error">{error}</p>}

      <div className="todo-filters">
        {['all', 'active', 'done'].map(f => (
          <button key={f} className={filter === f ? 'selected' : ''} onClick={() => setFilter(f)}>
            {f}
          </button>
        ))}
      </div>

      {visibleTodos.length === 0 ? (
        <p className="todo-empty">{EMPTY_TEXT[filter]}</p>
      ) : (
        <ul className="todo-list">
          {visibleTodos.map(todo => (
            <li key={todo.id} className={todo.done ? 'done' : ''}>
              <label>
                <input type="checkbox" checked={todo.done} onChange={() => toggle(todo.id)} />
                {todo.text}
              </label>
              <button onClick={() => remove(todo.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}

      <div className="todo-footer">
        <span>{activeCount} left</span>
        {doneCount > 0 && <button onClick={clearDone}>Clear done ({doneCount})</button>}
      </div>
    </div>
  );
}
