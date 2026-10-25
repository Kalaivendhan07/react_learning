export default function HistoryBar({ past, present, future }) {
  return (
    <div className="history">
      <p>History</p>
      <div className="history-list">
        {past.map((v, i) => <span key={'p' + i} className="chip">{v}</span>)}
        <span className="chip current">{present}</span>
        {future.map((v, i) => <span key={'f' + i} className="chip future">{v}</span>)}
      </div>
    </div>
  );
}
