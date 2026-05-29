import { useState, useEffect } from 'react';

const CODESPACE = import.meta.env.VITE_CODESPACE_NAME;
const API_URL = CODESPACE
  ? `https://${CODESPACE}-8000.app.github.dev/api/teams`
  : 'http://localhost:8000/api/teams';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setTeams(Array.isArray(data) ? data : (data.results ?? [])))
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <p>Error loading teams: {error}</p>;

  return (
    <div>
      <h2>Teams</h2>
      {teams.length === 0 ? (
        <p>No teams found.</p>
      ) : (
        <ul>
          {teams.map((t) => (
            <li key={t._id}>
              <strong>{t.name}</strong>
              {t.members && t.members.length > 0 && (
                <span> — {t.members.join(', ')}</span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Teams;
