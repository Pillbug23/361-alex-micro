import React, { useState, ChangeEvent } from 'react';
import './App.css';
import SearchField from './components/search/SearchField';
import Table from './components/table/Table';

function App() {
  const handleNutritionData = (nutritionData: any) => {
    // Handle the nutrition data received from the search component
    // You can perform any additional processing or state management here
    console.log(nutritionData);
  };

  interface WeatherData {
    temperature: number;
    description: string;
    name: string;
  }

  const [zipCode, setZipCode] = useState('');
  /*
  useState hook
  <WeatherData | null> specifies the type of the state variable 
  useState variable weather can hold type of WeatherData, an object,
  or null
  */
  const [weather, setWeather] = useState<WeatherData | null> (null);

  /* Fetches weather data  */
  const fetchWeather = async () => {
    if (zipCode === '') {
      alert('No zipcode was entered, please enter a zipcode')
    }
    try {
      const response = await fetch(`http://localhost:3100/weather/${zipCode}`);
      const data = await response.json();
      setWeather(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  /*Update the following zipcode on keyboard input */
  const handleZipCodeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setZipCode(event.target.value)
  };

  return (
    <div className="App">
      <header className="">
        <h1>Calorie Curious</h1>
      </header>
      <div>
        <input 
          type="text" 
          placeholder="Enter your Zip code"
          onChange={handleZipCodeChange}
          value={zipCode}
        >
        </input>
        <button onClick={fetchWeather}>Get Weather</button>
        <div>
        {weather && (
            <div>
              <p>Temperature: {weather.temperature}</p>
              <p>Description: {weather.description}</p>
              <p>City: {weather.name}</p>
            </div>
          )}
        </div>
      </div>
      <SearchField onNutritionData={handleNutritionData} />
    </div>
  );
}

export default App;