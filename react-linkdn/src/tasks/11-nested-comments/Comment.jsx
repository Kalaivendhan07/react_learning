import { memo, useState } from 'react';
import { countReplies } from './tree';

const Comment = memo(function Comment({ comment, dispatch }) {
  const [open, setOpen] = useState(true);
  const [mode, setMode] = useState('view');
  const [text, setText] = useState('');

  const total = countReplies(comment);

  function startReply() {
    setText('');
    setMode('reply');
  }

  function startEdit() {
    setText(comment.text);
    setMode('edit');
  }

  function submit(e) {
    e.preventDefault();
    if (text.trim() === '') return;
    if (mode === 'reply') {
      dispatch({
        type: 'replied',
        parentId: comment.id,
        reply: { id: crypto.randomUUID(), author: 'Kalaivendhan', role: 'Developer', text: text.trim(), replies: [] },
      });
      setOpen(true);
    } else {
      dispatch({ type: 'edited', id: comment.id, text: text.trim() });
    }
    setMode('view');
  }

  return (
    <li className="comment">
      <div className="comment-head">
        {comment.replies.length > 0 && (
          <button className="comment-toggle" onClick={() => setOpen(!open)} aria-expanded={open}>
            {open ? '−' : '+'}
          </button>
        )}
        <b>{comment.author}</b>
        <span className={'comment-role ' + comment.role.toLowerCase().replace(' ', '-')}>{comment.role}</span>
        {total > 0 && <span className="comment-count">{total} {total === 1 ? 'reply' : 'replies'}</span>}
      </div>

      {mode === 'edit' ? null : <p className="comment-text">{comment.text}</p>}

      {mode === 'view' && (
        <div className="comment-actions">
          <button onClick={startReply}>Reply</button>
          <button onClick={startEdit}>Edit</button>
          <button onClick={() => setMode('confirm')}>Delete</button>
        </div>
      )}

      {mode === 'confirm' && (
        <div className="comment-confirm">
          Delete this comment and all its replies?
          <button className="comment-danger" onClick={() => dispatch({ type: 'deleted', id: comment.id })}>Yes, delete</button>
          <button onClick={() => setMode('view')}>Cancel</button>
        </div>
      )}

      {(mode === 'reply' || mode === 'edit') && (
        <form className="comment-form" onSubmit={submit}>
          <input
            autoFocus
            value={text}
            onChange={e => setText(e.target.value)}
            onKeyDown={e => e.key === 'Escape' && setMode('view')}
            placeholder={mode === 'reply' ? 'Write a reply...' : ''}
          />
          <button type="submit">{mode === 'reply' ? 'Reply' : 'Save'}</button>
          <button type="button" onClick={() => setMode('view')}>Cancel</button>
        </form>
      )}

      {open && comment.replies.length > 0 && (
        <ul className="comment-replies">
          {comment.replies.map(reply => (
            <Comment key={reply.id} comment={reply} dispatch={dispatch} />
          ))}
        </ul>
      )}
    </li>
  );
});

export default Comment;
