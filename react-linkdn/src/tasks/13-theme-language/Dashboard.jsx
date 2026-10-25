import { memo } from 'react';
import { useTheme } from './themeContext';
import { useLang } from './langContext';

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const { lang, setLang, t } = useLang();
  console.log('Header rendered');

  return (
    <header className="dash-header">
      <h2>{t.title}</h2>
      <div className="dash-header-actions">
        <button onClick={toggleTheme}>
          {t.theme}: {theme === 'light' ? '☀ Light' : '☾ Dark'}
        </button>
        <select value={lang} onChange={e => setLang(e.target.value)}>
          <option value="en">English</option>
          <option value="ta">தமிழ்</option>
        </select>
      </div>
    </header>
  );
}

export const KpiCards = memo(function KpiCards() {
  const { t } = useLang();
  console.log('KpiCards rendered');

  return (
    <div className="dash-cards">
      <div className="dash-card"><span>{t.open}</span><b>42</b></div>
      <div className="dash-card"><span>{t.won}</span><b>9</b></div>
      <div className="dash-card"><span>{t.revenue}</span><b>₹12.8L</b></div>
    </div>
  );
});

export const Chart = memo(function Chart() {
  const { theme } = useTheme();
  console.log('Chart rendered');
  const bars = [40, 65, 30, 80, 55, 90];

  return (
    <div className="dash-chart">
      {bars.map((h, i) => (
        <div key={i} className="dash-bar" style={{ height: h + '%', background: theme === 'dark' ? '#58c4dc' : '#087ea4' }}></div>
      ))}
    </div>
  );
});

export const Sidebar = memo(function Sidebar() {
  console.log('Sidebar rendered');
  return (
    <aside className="dash-side">
      <p>Deals</p>
      <p>Reports</p>
      <p>Settings</p>
    </aside>
  );
});
