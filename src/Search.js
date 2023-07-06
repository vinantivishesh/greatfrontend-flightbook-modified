import React, { useState } from 'react';

const cities = require('./cities.json');

const Search = ({ location, label, onSelect }) => {
  const [text, setText] = useState(location || '');

  const cityList = Object.values(cities)
    .filter((city) => {
      const cityName = city.toLowerCase();
      const searchText = text.toLowerCase();
      return (
        searchText && cityName.includes(searchText) && searchText !== cityName
      );
    })
    ?.map((city) => (
      <div
        key={`city#${city}`}
        onClick={() => {
          setText(city);
          onSelect(city);
        }}
      >
        {city}
      </div>
    ));

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <label htmlFor="input-city">{label}</label>
      <input
        id="input-city"
        type="text"
        placeholder="Type"
        value={text}
        onChange={(e) => {
          const targetVal = e.target.value.toUpperCase();
          setText(targetVal);
          if (targetVal == '') onSelect(targetVal);
        }}
      />

      <div>{cityList}</div>
    </div>
  );
};

export default Search;
