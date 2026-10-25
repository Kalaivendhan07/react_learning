import ThemeProvider from './ThemeProvider';
import LangProvider from './LangProvider';
import { Chart, Header, KpiCards, Sidebar } from './Dashboard';
import './style.css';

export default function ThemeLanguage() {
  return (
    <ThemeProvider>
      <LangProvider>
        <div className="dash">
          <Sidebar />
          <div className="dash-main">
            <Header />
            <KpiCards />
            <Chart />
          </div>
        </div>
        <p className="dash-note">Open the console and switch the theme: KpiCards and Sidebar do not re-render.</p>
      </LangProvider>
    </ThemeProvider>
  );
}
