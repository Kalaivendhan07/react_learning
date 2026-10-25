function updateTree(comments, id, update) {
  let changed = false;
  const result = [];

  for (const c of comments) {
    if (c.id === id) {
      changed = true;
      const updated = update(c);
      if (updated) result.push(updated);
      continue;
    }
    const replies = updateTree(c.replies, id, update);
    if (replies !== c.replies) {
      changed = true;
      result.push({ ...c, replies });
    } else {
      result.push(c);
    }
  }

  return changed ? result : comments;
}

export function countReplies(comment) {
  return comment.replies.reduce((sum, r) => sum + 1 + countReplies(r), 0);
}

export function commentsReducer(comments, action) {
  if (action.type === 'replied') {
    return updateTree(comments, action.parentId, c => ({ ...c, replies: [...c.replies, action.reply] }));
  }
  if (action.type === 'edited') {
    return updateTree(comments, action.id, c => ({ ...c, text: action.text }));
  }
  if (action.type === 'deleted') {
    return updateTree(comments, action.id, () => null);
  }
  throw new Error('Unknown action ' + action.type);
}
