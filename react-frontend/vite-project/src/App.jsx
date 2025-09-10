import React, { useState } from 'react';
import SearchForm from './components/Search/SearchForm';
import Results from './components/Results/Results';
import Navbar from './components/Navbar/Navbar';
import useGeolocation from './hooks/useGeolocation';
import { searchFood } from './services/api';
import './App.css';

function App() {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { getUserLocation } = useGeolocation();

  const handleSearch = async (query) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const location = await getUserLocation();
      const searchResults = await searchFood(query, location.lat, location.lng);
      setResults(searchResults);
    } catch (err) {
      setError(err.message || 'An error occurred');
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <Navbar/>
      <SearchForm onSearch={handleSearch} isLoading={isLoading} />
      <Results results={results} isLoading={isLoading} error={error} />
    </div>
  );
}

export default App;
