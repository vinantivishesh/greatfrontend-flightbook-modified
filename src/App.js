import React, { useState, useEffect } from 'react';
import Search from './Search';
import Calendar from './Calendar';
import { TODAY } from './utils';
import './style.css';

let cities = require('./cities.json');

export default function App() {
  const [flightOption, setFlightOption] = useState('return');
  const [startDate, setStartDate] = useState(null);
  const [midDate, setMidDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [srcOneWay, setSrcOneWay] = useState('');
  const [destOneWay, setDestOneWay] = useState('');
  const [srcMultiWay, setSrcMultiWay] = useState('');
  const [destMultiWay, setDestMultiWay] = useState('');
  const [srcReturn, setSrcReturn] = useState('');
  const [destReturn, setDestReturn] = useState('');

  const [isValid, setIsValid] = useState(true);

  const handleOptionChange = (e) => {
    setFlightOption(e.target.value);
  };

  // console.log(srcOneWay);
  // console.log(destOneWay);
  // console.log(srcMultiWay);
  // console.log(destMultiWay);
  // console.log(srcReturn);
  // console.log(destReturn);

  useEffect(() => {
    let isValid = true;
    switch (flightOption) {
      case 'multi-way':
        isValid &=
          srcMultiWay !== '' && destMultiWay !== '' && midDate !== null;
      case 'return':
        isValid &= srcReturn !== '' && destReturn !== '' && endDate !== null;
      default:
        isValid &= srcOneWay !== '' && destOneWay !== '' && startDate !== null;
    }
    console.log('valid', isValid);
    setIsValid(isValid);
  });

  const radioGroup = (
    <div className={'flight-option-group'}>
      <label id={'one-way'}>
        <input
          type="radio"
          value="one-way"
          checked={flightOption == 'one-way'}
          onChange={handleOptionChange}
        />
        One way
      </label>
      <label id={'multi-way'}>
        <input
          type="radio"
          value="multi-city"
          checked={flightOption == 'multi-city'}
          onChange={handleOptionChange}
        />
        Multi way
      </label>
      <label id={'return'}>
        <input
          type="radio"
          value="return"
          checked={flightOption == 'return'}
          onChange={handleOptionChange}
        />
        Return
      </label>
    </div>
  );

  return (
    <div>
      <div style={{ minWidth: '475px' }}>
        {radioGroup}
        <div className={'flight-option'}>
          <Search
            label="From"
            location={srcOneWay}
            onSelect={setSrcOneWay}
            onChange={setSrcOneWay}
          />
          <Search
            label="To"
            location={destOneWay}
            onSelect={setDestOneWay}
            onChange={setDestOneWay}
          />
          <Calendar
            startDay={TODAY}
            label="When"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        {flightOption === 'multi-city' && (
          <>
            <div className={'flight-option'}>
              <Search
                label="From"
                location={srcMultiWay}
                onSelect={setSrcMultiWay}
                onChange={setSrcMultiWay}
              />
              <Search
                label="To"
                location={destMultiWay}
                onSelect={setDestMultiWay}
                onChange={setDestMultiWay}
              />
              <Calendar
                startDay={startDate}
                label="When"
                value={midDate}
                onChange={(e) => setMidDate(e.target.value)}
              />
            </div>
            <div className={'flight-option'}>
              <Search
                label="From"
                location={srcReturn}
                onSelect={setSrcReturn}
                onChange={setSrcReturn}
              />
              <Search
                label="To"
                location={destReturn}
                onSelect={setDestReturn}
                onChange={setDestReturn}
              />
              <Calendar
                startDay={midDate}
                label="When"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </>
        )}
        {flightOption === 'return' && (
          <div className={'flight-option'}>
            <Search
              label="From"
              location={srcReturn}
              onSelect={setSrcReturn}
              onChange={setSrcReturn}
            />
            <Search
              label="To"
              location={destReturn}
              onSelect={setDestReturn}
              onChange={setDestReturn}
            />
            <Calendar
              startDay={startDate}
              label="When"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        )}
      </div>
      <button className={'search'} disabled={!isValid}>
        Search flights
      </button>
    </div>
  );
}
