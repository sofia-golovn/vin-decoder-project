import React, { useState } from "react";
import VinForm from "../components/VinForm";

export default function HomePage({ history, addToHistory }) {
  const [results, setResults] = useState([]);
  const [apiMessage, setApiMessage] = useState("");
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchVinData = async (vinToDecode) => {
    setApiError("");
    setApiMessage("");
    setLoading(true);

    try {
      const res = await fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/${vinToDecode}?format=json`);
      if (!res.ok) throw new Error("Помилка сервера при отриманні даних");

      const data = await res.json();

      setApiMessage(data.Message || "");

      const filteredResults = (data.Results || []).filter((item) => item.Value && item.Value.trim() !== "");

      setResults(filteredResults);
      addToHistory(vinToDecode);
    } catch (err) {
      setApiError(err.message || "Щось пішло не так...");
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-container">
      <h2>Розшифровка VIN-коду</h2>

      <VinForm onSubmit={fetchVinData} loading={loading} />

      {apiError && <div className="alert error">{apiError}</div>}
      {apiMessage && (
        <div className="alert info">
          <strong>Статус API:</strong> {apiMessage}
        </div>
      )}

      {history.length > 0 && (
        <div className="history-section">
          <h3>Останні запити:</h3>
          <div className="history-tags">
            {history.map((item, index) => (
              <button key={index} className="tag-btn" onClick={() => fetchVinData(item)}>
                {item}
              </button>
            ))}
          </div>
        </div>
      )}

      {results.length > 0 && (
        <div className="results-section">
          <h3>Результати розшифровки:</h3>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Характеристика (Variable)</th>
                  <th>Значення (Value)</th>
                </tr>
              </thead>
              <tbody>
                {results.map((item) => (
                  <tr key={item.VariableId}>
                    <td>
                      <strong>{item.Variable}</strong>
                    </td>
                    <td>{item.Value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
