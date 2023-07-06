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
  const [srcMultiCity, setsrcMultiCity] = useState(destOneWay);
  const [destMultiCity, setDestMultiCity] = useState('');
  const [srcReturn, setSrcReturn] = useState('');
  const [destReturn, setDestReturn] = useState('');

  const [isValid, setIsValid] = useState(true);

  const handleOptionChange = (e) => {
    setFlightOption(e.target.value);
  };

  // console.log(srcOneWay);
  // console.log(destOneWay);
  // console.log(srcMultiCity);
  // console.log(destMultiCity);
  // console.log(srcReturn);
  // console.log(destReturn);

  useEffect(() => {
    let isValid = true;
    switch (flightOption) {
      case 'multi-city':
        isValid &=
          srcMultiCity !== '' && destMultiCity !== '' && midDate !== null;
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

  const alertUser = () => {
    switch (flightOption) {
      case 'one-way':
        alert(
          `You are looking for ${flightOption} flight from ${srcOneWay} to ${destOneWay} on ${startDate}`
        );
        break;
      case 'multi-city':
        alert(
          `You are looking for ${flightOption} flight from ${srcOneWay} to ${destOneWay} and from ${srcMultiCity} to ${destMultiCity} and from ${srcReturn} to ${destReturn}`
        );
        break;
      case 'return':
        alert(
          `You are looking for ${flightOption} flight from ${srcOneWay} to ${destOneWay} and from ${srcReturn} to ${destReturn}`
        );
        break;
    }
  };

  return (
    <div>
      <div style={{ minWidth: '475px' }}>
        {radioGroup}
        <div className={'flight-option'}>
          <Search label="From" location={srcOneWay} onSelect={setSrcOneWay} />
          <Search label="To" location={destOneWay} onSelect={setDestOneWay} />
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
                location={srcMultiCity}
                onSelect={setsrcMultiCity}
              />
              <Search
                label="To"
                location={destMultiCity}
                onSelect={setDestMultiCity}
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
              />
              <Search
                label="To"
                location={destReturn}
                onSelect={setDestReturn}
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
            <Search label="From" location={srcReturn} onSelect={setSrcReturn} />
            <Search label="To" location={destReturn} onSelect={setDestReturn} />
            <Calendar
              startDay={startDate}
              label="When"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        )}
      </div>
      <button className={'search'} disabled={!isValid} onClick={alertUser}>
        Search flights
      </button>
    </div>
  );
}
