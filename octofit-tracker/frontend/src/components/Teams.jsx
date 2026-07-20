import { useEffect, useState } from 'react';
import { getApiBaseUrl } from '../utils/api';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadTeams() {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/teams/`);
        const data = await response.json();
        const items = Array.isArray(data) ? data : data.items ?? [];
        setTeams(items);
      } catch (err) {
        setError(err.message || 'Unable to load teams');
      } finally {
        setLoading(false);
      }
    }

    loadTeams();
  }, []);

  return (
    <section>
      <h2>Teams</h2>
      {loading && <p>Loading…</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && (
        <ul className="list-group">
          {teams.map((team) => (
            <li className="list-group-item" key={team._id || team.id || team.name}>
              <strong>{team.name}</strong> — {team.sport} ({team.members} members)
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default Teams;
