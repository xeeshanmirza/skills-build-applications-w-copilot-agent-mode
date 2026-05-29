import { useState, useEffect } from 'react';

const CODESPACE = import.meta.env.VITE_CODESPACE_NAME;
const API_URL = CODESPACE
  ? `https://${CODESPACE}-8000.app.github.dev/api/workouts`
  : 'http://localhost:8000/api/workouts';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setWorkouts(Array.isArray(data) ? data : (data.results ?? [])))
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <p>Error loading workouts: {error}</p>;

  return (
    <div>
      <h2>Workouts</h2>
      {workouts.length === 0 ? (
        <p>No workouts found.</p>
      ) : (
        <ul>
          {workouts.map((w) => (
            <li key={w._id}>
              <strong>{w.name}</strong> — {w.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Workouts;
