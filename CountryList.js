import React from 'react';
import StateList from './StateList';

const CountryList = ({ countries }) => {
  return (
    <div className="country-list">
      {countries.length === 0 ? (
        <p>No countries found</p>
      ) : (
        countries.map((country, index) => (
          <div key={index} className="country-card">
            <h2>{country.name.common}</h2>
            <StateList country={country} />
          </div>
        ))
      )}
    </div>
  );
};

export default CountryList;
