import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import WeatherSlaider from '../WeatherSlaider/WeatherSlaider';
import WeatherCurrentItem from '../WeatherCurrentItem/WeatherCurrentItem';
import cn from 'classnames';
import { getLogs } from '../../actions/log';

import styles from './Weather.module.css';

const Weather = () => {
    const dispatch = useDispatch();
    const {cityName, forecast} = useSelector(state=>state.weather);
    useEffect(()=>{
        dispatch(getLogs())
    }, [dispatch, cityName, forecast])
    const findWeather = () => {
        const descriptionWeather = forecast[0].weather.description.toLowerCase();
        if (descriptionWeather.includes('дождь') 
            || descriptionWeather.includes('ливень') 
            || descriptionWeather.includes('дожди')
        ) {
            return cn(styles.weather, styles.weatherRain)
        }
        if (descriptionWeather.includes('ясно') || descriptionWeather.includes('местами облачно')) {
            return cn(styles.weather, styles.weatherSun)
        }
        if (descriptionWeather.includes('облачно')) {
            return cn(styles.weather, styles.weatherCloud)
        }
        return cn(styles.weather)
    }

    return (
        <div className={styles.container}>
            <div className={forecast.length && findWeather()}>
                {forecast.length && <WeatherCurrentItem cityName={cityName} currentWeather={forecast[0]}/>}
                {forecast.length && <WeatherSlaider forecast={forecast} />}
            </div>
        </div>
        
    )
}

export default Weather;