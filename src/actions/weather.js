import {setWeather} from "../components/reducers/weatherReducer";
import { loaderOn, loaderOff } from "../components/reducers/appReducer";
import {API_WEATHER_BIT} from "../config/config";

export const getDataWeather = (city, lang = 'ru') => {
    return async dispatch => {
        try {
            const urlWeatherbit = `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&days=16&units=M&lang=${lang}&key=${API_WEATHER_BIT}`;
            dispatch(loaderOn())
            const response = await fetch(urlWeatherbit);
            const data = await response.json();
            dispatch(setWeather(data))
            dispatch(loaderOff())
        } catch (e) {
            dispatch(loaderOff())
            throw new Error('API ERROR')
        }
    }
}

export const getDataWeatherMyLocation = (latitude, longitude) => {
    return async dispatch => {
        try {
            const lang = 'ru';
            const urlWeatherbit = `https://api.weatherbit.io/v2.0/forecast/daily?&lat=${latitude}&lon=${longitude}&days=16&units=M&lang=${lang}&key=${API_WEATHER_BIT}`;
            dispatch(loaderOn())
            const response = await fetch(urlWeatherbit);
            const data = await response.json();
            dispatch(setWeather(data))
            dispatch(loaderOff())
        } catch (e) {
            dispatch(loaderOff())
            throw new Error('API ERROR')
        }
    }
}