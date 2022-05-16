import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { getDataWeather } from '../../actions/weather';

import styles from './WeatherCurrentItem.module.css';

const WeatherCurrentItem = ({cityName, currentWeather}) => {

    const dispatch = useDispatch();
    const [searchCityName, setSearchCityName] = useState('');

    const sendWeatherCityName = (event) => {
        event.preventDefault();
        if (searchCityName) {
            dispatch(getDataWeather(searchCityName))
            setSearchCityName('');
        }
    }

    const changeCityName = event => {
        setSearchCityName(event.target.value.replace(/[^a-zа-яё\s]/gi, ''));
    }

    return (
        <div className={styles.currentItem}>
            <form onSubmit={sendWeatherCityName}>
                <input 
                    type="search" 
                    className={styles.searchInput} 
                    placeholder="Поиск городов"
                    value={searchCityName}
                    required
                    onChange={changeCityName}
                />
            </form>
            <div className={styles.container}>
                <p className={styles.cityTitle}>{cityName}</p>
                <span className={styles.date}>
                    <span className={styles.simpleText}>{currentWeather.currentDayOfWeek}</span>
                    <span className={styles.simpleText}>{currentWeather.currentDayOfMonth}</span>
                    <span className={styles.simpleText}>{currentWeather.currentMonth}</span>
                </span>
                <div className={styles.box}>
                    <div className={styles.tempWeatherImgWeather}>
                        <span className={styles.temp}>
                            {currentWeather.high_temp > 0 ? '+' : ''}{Math.round(currentWeather.high_temp)}
                        </span>
                        <img src={currentWeather.weather.icon} alt="icon weather item" className={styles.icon} />
                    </div>
                    
                    <p className={styles.description}>{currentWeather.weather.description}</p>
                </div>
                <div className={styles.moreInfo}>
                    <div>
                        <p className={styles.bolt}>Ощущается</p>
                        <p className={styles.simpleText}>
                            {currentWeather.app_max_temp > 0 ? '+' : ''}{Math.round(currentWeather.app_max_temp)}
                        </p>
                    </div>
                    <div>
                        <p className={styles.bolt}>Влажность</p>
                        <p className={styles.simpleText}>{currentWeather.rh}%</p>
                    </div>
                    <div>
                        <p className={styles.bolt}>Скорость ветра</p>
                        <p className={styles.simpleText}>{currentWeather.wind_spd}м/с</p>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default WeatherCurrentItem;