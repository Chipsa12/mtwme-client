import { parseWeatherData } from "../../helpers/parseWeatherData";

const SET_WEATHER = "SET_WEATHER"

const defaultState = {
    cityName: '',
    forecast: []
}

export default function userReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_WEATHER:
            const {city_name, data} = action.payload;
            const weatherData = parseWeatherData(data)
            return {
                ...state,
                cityName: city_name,
                forecast: weatherData
            }
        default:
            return state
    }
}


export const setWeather = weather => ({type: SET_WEATHER, payload: weather})
