import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CountryList from './CountryList';
import './App.css'; // Import CSS

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = () => {
    axios.get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching countries:', error);
        setLoading(false);
      });
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter countries based on the search term
  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app">
      <h1>Country, State, and City Management</h1>
      <input
        type="text"
        placeholder="Search for a country..."
        value={searchTerm}
        onChange={handleSearch}
        className="search-box"
      />
      {loading ? (
        <p>Loading countries...</p>
      ) : (
        <CountryList countries={filteredCountries} />
      )}
    </div>
  );
};

export default App;
