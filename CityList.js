import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CityList = ({ state }) => {
  const [cities, setCities] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (state.name) {
      fetchCities(state.name);
    }
  }, [state]);

  const fetchCities = (stateName) => {
    setLoading(true);
    axios.get('https://wft-geo-db.p.rapidapi.com/v1/geo/countries', {
      params: { namePrefix: stateName, country: 'US' },  // Replace 'US' if necessary with correct country code
      headers: {
        'X-RapidAPI-Key': '6b9beb3562msh5d45cabf71137f9p1e6e95jsn6ad5c0f9e0cf',  // Replace with your own API key from RapidAPI
        'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
      }
    })
    .then(response => {
      console.log(response.data); // Log the response to check its structure
      setCities(response.data.data);  // Assuming API returns cities in `data`
      setLoading(false);
    })
    .catch(error => {
      console.error('Error fetching cities:', error);
      setLoading(false);
    });
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Check if the city name matches the search term (case-insensitive)
  const filteredCities = cities.filter(city => {
    // You can also check for alternative city name formats based on API response
    return city.city && city.city.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="city-list">
      <input
        type="text"
        placeholder="Search for a city..."
        value={searchTerm}
        onChange={handleSearch}
        className="search-box"
      />
      {loading ? (
        <p>Loading cities...</p>
      ) : (
        <div>
          {filteredCities.length === 0 ? (
            <p>No cities found</p>
          ) : (
            filteredCities.map((city, index) => (
              <div key={index} className="city-card">
                <h4>{city.city}</h4> {/* Verify if this is correct property */}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default CityList;
