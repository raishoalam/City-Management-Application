import React, { useState } from 'react';
import CityList from './CityList';

const StateList = ({ country }) => {
  const [states, setStates] = useState(country.states || []);

  const addState = () => {
    const stateName = prompt('Enter state name:');
    if (stateName) {
      setStates([...states, { name: stateName, cities: [] }]);
    }
  };

  const editState = (index) => {
    const newStateName = prompt('Enter new state name:');
    if (newStateName) {
      const updatedStates = [...states];
      updatedStates[index].name = newStateName;
      setStates(updatedStates);
    }
  };

  const deleteState = (index) => {
    if (window.confirm('Are you sure you want to delete this state?')) {
      const updatedStates = states.filter((_, i) => i !== index);
      setStates(updatedStates);
    }
  };

  return (
    <div className="state-list">
      <button onClick={addState} className="add-state-btn">Add State</button>
      {states.map((state, index) => (
        <div key={index} className="state-card">
          <h3>{state.name}</h3>
          <button onClick={() => editState(index)} className="edit-btn">Edit</button>
          <button onClick={() => deleteState(index)} className="delete-btn">Delete</button>
          <CityList state={state} />
        </div>
      ))}
    </div>
  );
};

export default StateList;
