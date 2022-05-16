import React from 'react';
import { Carousel } from '@trendyol-js/react-carousel';
import Arrow from '../UI/arrow/Arrow';
import WeatherItem from '../WeatherItem/WeatherItem';
import styles from './WeatherSlaider.module.css'

const WeatherSlaider = ({forecast}) => {

    return (
        <Carousel
            className={styles.slaider} 
            show={3} 
            slide={1} 
            swiping={true} 
            leftArrow={<Arrow direction="left" />} 
            rightArrow={<Arrow direction="right" />}
        >
        {
            forecast.map((data, index) => {
                return <WeatherItem 
                    key={index} 
                    highTemp={Math.round(data.high_temp)} 
                    lowTemp={Math.round(data.low_temp)}
                    dayOfMonth={data.currentDayOfMonth || data.nextDayOfMonth} 
                    dayOfWeek={data.currentDayOfWeek || data.nextDayOfWeek}
                    month={data.currentMonth || data.nextMonth}
                    description={data.weather.description}
                    icon={data.weather.icon}
                />
            })
        }
        </Carousel>
    )
};

export default WeatherSlaider;