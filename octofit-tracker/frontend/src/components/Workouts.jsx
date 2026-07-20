import { useEffect, useState } from 'react';
import { getApiBaseUrl } from '../utils/api';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadWorkouts() {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/workouts/`);
        const data = await response.json();
        const items = Array.isArray(data) ? data : data.items ?? [];
        setWorkouts(items);
      } catch (err) {
        setError(err.message || 'Unable to load workouts');
      } finally {
        setLoading(false);
      }
    }

    loadWorkouts();
  }, []);

  return (
    <section>
      <h2>Workouts</h2>
      {loading && <p>Loading…</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && (
        <ul className="list-group">
          {workouts.map((workout) => (
            <li className="list-group-item" key={workout._id || workout.id || workout.name}>
              <strong>{workout.name}</strong> — {workout.intensity} · {workout.durationMinutes} min
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default Workouts;
