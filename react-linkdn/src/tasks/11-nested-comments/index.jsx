import { useReducer } from 'react';
import Comment from './Comment';
import { commentsReducer } from './tree';
import './style.css';

const START = [
  {
    id: 'c1',
    author: 'Guna',
    role: 'Team Lead',
    text: 'Release is on Friday. Please finish your tasks.',
    replies: [
      {
        id: 'c2',
        author: 'Keerthi',
        role: 'Tester',
        text: 'Login page has a bug.',
        replies: [
          {
            id: 'c3',
            author: 'Kalaivendhan',
            role: 'Developer',
            text: 'Fixed it. Please check.',
            replies: [],
          },
        ],
      },
    ],
  },
  {
    id: 'c4',
    author: 'Punitha',
    role: 'Tester',
    text: 'Cart page is not working on mobile.',
    replies: [
      {
        id: 'c5',
        author: 'Swathy',
        role: 'Developer',
        text: 'I will fix it today.',
        replies: [],
      },
    ],
  },
];

export default function NestedComments() {
  const [comments, dispatch] = useReducer(commentsReducer, START);

  return (
    <ul className="comment-tree">
      {comments.map(c => (
        <Comment key={c.id} comment={c} dispatch={dispatch} />
      ))}
    </ul>
  );
}
