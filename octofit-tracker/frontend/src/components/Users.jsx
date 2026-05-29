import { useState, useEffect } from 'react';

const CODESPACE = import.meta.env.VITE_CODESPACE_NAME;
const API_URL = CODESPACE
  ? `https://${CODESPACE}-8000.app.github.dev/api/users`
  : 'http://localhost:8000/api/users';

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setUsers(Array.isArray(data) ? data : (data.results ?? [])))
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <p>Error loading users: {error}</p>;

  return (
    <div>
      <h2>Users</h2>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <ul>
          {users.map((u) => (
            <li key={u._id}>
              <strong>{u.username}</strong> — {u.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Users;
