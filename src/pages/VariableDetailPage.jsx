import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router";

export default function VariableDetailPage() {
  const { variableId } = useParams();
  const [variable, setVariable] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://vpic.nhtsa.dot.gov/api/vehicles/getvehiclevariablelist?format=json")
      .then((res) => {
        if (!res.ok) throw new Error("Помилка завантаження даних");
        return res.json();
      })
      .then((data) => {
        const found = data.Results.find((v) => v.ID.toString() === variableId);
        if (found) {
          setVariable(found);
        } else {
          setError("Змінну з таким ID не знайдено");
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [variableId]);

  if (loading) return <div className="loading">Завантаження опису змінної...</div>;
  if (error) return <div className="alert error">{error}</div>;

  const cleanDescription = (html) => {
    return { __html: html };
  };

  return (
    <div className="detail-card">
      <Link to="/variables" className="back-link">
        ← Назад до списку
      </Link>
      <h2>{variable.Name}</h2>
      <div className="meta-info">
        <span>
          <strong>Група:</strong> {variable.GroupName}
        </span>
        <span>
          <strong>ID змінної:</strong> {variable.ID}
        </span>
      </div>
      <hr />
      <h3>Опис характеристики:</h3>
      <div className="description-content" dangerouslySetInnerHTML={cleanDescription(variable.Description)} />
    </div>
  );
}
