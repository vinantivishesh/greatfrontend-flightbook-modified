import React from 'react';

export default function Calendar({ startDay, label, onChange }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <label htmlFor="input-date">{label}</label>
      <input id="input-date" type="date" min={startDay} onChange={onChange} />
    </div>
  );
}
