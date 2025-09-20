import React from 'react';
import Card from './Card/Cards';
import styles from './Results.module.css';

const Results = ({ results, isLoading, error }) => {
  if (isLoading) {
    return <div className={styles.results}>
      <div className={styles.loading}>Loading...</div>
    </div>;
  }

  if (error) {
    return <div className={styles.results}>
      <div className={styles.error}>Error: {error}</div>
    </div>;
  }

   if(!results){
    return null
  }

  if (results && results.length === 0) {
    return <div className={styles.results}>
      <div className={styles.noResults}>No results found</div>
    </div>;
  }

 

  return (
    <div className={styles.results}>
      <div className={styles.resultsHeader}>
        <h2>Found {results.length} places</h2>
      </div>
      <div className={styles.cardsContainer}>
        {results.map((place, index) => (
          <Card key={index} place={place} />
        ))}
      </div>
    </div>
  );
};

export default Results;