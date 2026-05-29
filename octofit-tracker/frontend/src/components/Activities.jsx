import { useState, useEffect } from 'react';

const CODESPACE = import.meta.env.VITE_CODESPACE_NAME;
const API_URL = CODESPACE
  ? `https://${CODESPACE}-8000.app.github.dev/api/activities`
  : 'http://localhost:8000/api/activities';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setActivities(Array.isArray(data) ? data : (data.results ?? [])))
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <p>Error loading activities: {error}</p>;

  return (
    <div>
      <h2>Activities</h2>
      {activities.length === 0 ? (
        <p>No activities found.</p>
      ) : (
        <ul>
          {activities.map((a) => (
            <li key={a._id}>
              <strong>{a.name}</strong> — {a.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Activities;
