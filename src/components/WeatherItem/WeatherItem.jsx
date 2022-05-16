import React from 'react';
import cn from 'classnames';
import styles from './WeatherItem.module.css';

const WeatherItem = ({highTemp, lowTemp, dayOfMonth, dayOfWeek, month, description, icon}) => {
    
    const weekendDays = ['Сб','Вс'];

    return (
        <div className={styles.container}>
            <div className={styles.weatherCard}>
                <p className={weekendDays.includes(dayOfWeek) ? cn(styles.boltDay, styles.weekendDay) : styles.boltDay}>{dayOfWeek}</p>
                <span className={styles.date}>
                    <p className={styles.simpleText}>{dayOfMonth}</p>
                    <p className={styles.simpleText}>{month}</p>
                </span>
                <img 
                    src={icon}
                    alt="icon weather item" 
                    className={styles.icon}
                />
                <p className={cn(styles.bolt, styles.temp)}>{highTemp > 0 ? '+' : ''}{highTemp}</p>
                <p className={cn(styles.simpleText, styles.temp)}>{lowTemp > 0 ? '+' : ''}{lowTemp}</p>
                <p className={styles.simpleText}>{description}</p>
            </div>
        </div> 
    )
}

export default WeatherItem;