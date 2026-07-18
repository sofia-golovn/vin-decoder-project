import React, { useState } from "react";

export default function VinForm({ onSubmit, loading }) {
  const [vin, setVin] = useState("");
  const [error, setError] = useState("");

  const validateVin = (value) => {
    const clean = value.toUpperCase().trim();
    if (!clean) return "Поле не може бути порожнім";
    if (clean.length !== 17) return `VIN-код має містити рівно 17 символів (зараз ${clean.length})`;
    if (/[IOQ]/.test(clean)) return "VIN-код не може містити заборонені літери I, O або Q";
    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationError = validateVin(vin);

    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");
    onSubmit(vin.toUpperCase().trim());
  };

  return (
    <div className="form-wrapper">
      <form onSubmit={handleSubmit} className="vin-form">
        <input
          type="text"
          value={vin}
          onChange={(e) => {
            setVin(e.target.value);
            if (error) setError("");
          }}
          placeholder="Введіть 17-значний VIN"
          maxLength="17"
        />
        <button type="submit" disabled={loading}>
          {loading ? "Завантаження..." : "Розшифрувати"}
        </button>
      </form>

      {error && <div className="alert error">{error}</div>}
    </div>
  );
}
