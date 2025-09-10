import React from 'react';
import styles from './Card.module.css';

const Card = ({ place }) => {
  const {
    name,
    address,
    rating,
    open_now,
    price_level,
    photo_url,
    place_id
  } = place;

  return (
    <div className={styles.card}>
      {photo_url && (
        <div className={styles.imageContainer}>
          <img src={photo_url} alt={name} className={styles.image} />
        </div>
      )}
      
      <div className={styles.content}>
        <h3 className={styles.name}>{name}</h3>
        
        <div className={styles.details}>
          {address && (
            <p className={styles.address}>
              <span className={styles.icon}>📍</span>
              {address}
            </p>
          )}
          
          <div className={styles.info}>
            {rating && (
              <div className={styles.rating}>
                <span className={styles.icon}>⭐</span>
                <span>{rating}</span>
              </div>
            )}
            
            {price_level && (
              <div className={styles.priceLevel}>
                <span className={styles.icon}>💰</span>
                <span>{'$'.repeat(price_level)}</span>
              </div>
            )}
            
            <div className={`${styles.status} ${open_now ? styles.open : styles.closed}`}>
              <span className={styles.icon}>{open_now ? '🟢' : '🔴'}</span>
              <span>{open_now ? 'Open Now' : 'Closed'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;