import { useEffect, useState } from 'react';

function Leaderboard() {
  const apiUrl = import.meta.env.VITE_CODESPACE_NAME
    ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
    : 'http://localhost:8000/api/leaderboard/';
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadLeaderboard() {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const items = Array.isArray(data) ? data : data.items ?? [];
        setEntries(items);
      } catch (err) {
        setError(err.message || 'Unable to load leaderboard');
      } finally {
        setLoading(false);
      }
    }

    loadLeaderboard();
  }, []);

  return (
    <section>
      <h2>Leaderboard</h2>
      {loading && <p>Loading…</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && (
        <ul className="list-group">
          {entries.map((entry) => (
            <li className="list-group-item" key={entry._id || entry.rank}>
              #{entry.rank} — {entry.userId} · {entry.points} pts
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default Leaderboard;
