import { useEffect, useState } from 'react';
import { getApiBaseUrl } from '../utils/api';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadUsers() {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/users/`);
        const data = await response.json();
        const items = Array.isArray(data) ? data : data.items ?? [];
        setUsers(items);
      } catch (err) {
        setError(err.message || 'Unable to load users');
      } finally {
        setLoading(false);
      }
    }

    loadUsers();
  }, []);

  return (
    <section>
      <h2>Users</h2>
      {loading && <p>Loading…</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && (
        <ul className="list-group">
          {users.map((user) => (
            <li className="list-group-item" key={user._id || user.id || user.email}>
              <strong>{user.name}</strong> — {user.email} ({user.role})
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default Users;
