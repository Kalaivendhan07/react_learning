import { Route, Routes } from 'react-router-dom';
import UserList from './UserList';
import UserDetail from './UserDetail';
import './style.css';

export default function UsersTable() {
  return (
    <Routes>
      <Route index element={<UserList />} />
      <Route path=":id" element={<UserDetail />} />
    </Routes>
  );
}
