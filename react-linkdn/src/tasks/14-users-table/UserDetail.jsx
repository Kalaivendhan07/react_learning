import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { USERS } from './users';

export default function UserDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { search } = useLocation();
  const user = USERS.find(u => u.id === Number(id));

  return (
    <div className="user-detail">
      <button onClick={() => navigate('..' + search, { relative: 'path' })}>← Back to list</button>
      {user ? (
        <div className="user-card">
          <h3>{user.name}</h3>
          <p>{user.email}</p>
          <p>{user.role} · {user.city}</p>
        </div>
      ) : (
        <p>User {id} was not found.</p>
      )}
    </div>
  );
}
