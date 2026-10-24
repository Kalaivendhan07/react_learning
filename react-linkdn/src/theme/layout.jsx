import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './sideBar';

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className={menuOpen ? 'theme menu-open' : 'theme'}>
      <header className="topbar">
        <button className="menu-btn" onClick={() => setMenuOpen(o => !o)} aria-label="Toggle menu">☰</button>
        <b>React Practice</b>
      </header>

      <Sidebar onNavigate={() => setMenuOpen(false)} />

      <main className="content">
        <Outlet />
      </main>

    </div>
  );
}