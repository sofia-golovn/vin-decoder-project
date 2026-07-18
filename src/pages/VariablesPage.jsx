import React, { useEffect, useState } from "react";
import { Link } from "react-router";

export default function VariablesPage() {
  const [variables, setVariables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://vpic.nhtsa.dot.gov/api/vehicles/getvehiclevariablelist?format=json")
      .then((res) => {
        if (!res.ok) throw new Error("Не вдалося завантажити список змінних");
        return res.json();
      })
      .then((data) => {
        setVariables(data.Results || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="loading">Завантаження списку змінних...</div>;
  if (error) return <div className="alert error">{error}</div>;

  return (
    <div>
      <h2>Доступні змінні автомобіля</h2>
      <p>Оберіть змінну для перегляду детального опису:</p>
      <ul className="variables-list">
        {variables.map((v) => (
          <li key={v.ID}>
            <Link to={`/variables/${v.ID}`} className="variable-link">
              <strong>{v.Name}</strong>
              <span className="group-badge">{v.GroupName}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
