import { useEffect, useState } from 'react';
import { getApiBaseUrl } from '../utils/api';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadActivities() {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/activities/`);
        const data = await response.json();
        const items = Array.isArray(data) ? data : data.items ?? [];
        setActivities(items);
      } catch (err) {
        setError(err.message || 'Unable to load activities');
      } finally {
        setLoading(false);
      }
    }

    loadActivities();
  }, []);

  return (
    <section>
      <h2>Activities</h2>
      {loading && <p>Loading…</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && (
        <ul className="list-group">
          {activities.map((activity) => (
            <li className="list-group-item" key={activity._id || activity.id || activity.type}>
              <strong>{activity.type}</strong> — {activity.durationMinutes} min · {activity.calories} cal
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default Activities;
