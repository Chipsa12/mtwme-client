const getDataWeather = (weatherData) => {
    return {
        'wind_spd':weatherData.wind_spd,
        'high_temp':weatherData.high_temp,
        'low_temp':weatherData.low_temp,
        'app_max_temp':weatherData.app_max_temp,
        'rh':weatherData.rh,
        'weather': {
            ...weatherData.weather,
            icon: `https://www.weatherbit.io/static/img/icons/${weatherData.weather.icon}.png`
        }
    }
};

const dayOfWeek = ['Вс','Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
const monthOfYear = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", 
                    "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
                ];

const getSixteenDays = () => {
    const currentDate = new Date();
    const currentDayOfWeek = dayOfWeek[currentDate.getDay()];
    const currentMonth = monthOfYear[currentDate.getMonth()];
    const currentDayOfMonth = currentDate.getDate();
    const currentYear = currentDate.getFullYear();
    const arrDays = [{
        currentDayOfWeek,
        currentDayOfMonth,
        currentMonth,
        currentYear
    }];
    for (let i = +currentDayOfMonth + 1; i < +currentDayOfMonth + 16; i++) {
        let nextDate = new Date(+currentYear, +currentDate.getMonth(), i);
        let nextDayOfWeek = dayOfWeek[nextDate.getDay()];
        let nextDayOfMonth = nextDate.getDate();
        let nextMonth = monthOfYear[nextDate.getMonth()];
        let nextYear = nextDate.getFullYear();
        arrDays.push({
            nextDayOfWeek,
            nextDayOfMonth,
            nextMonth,
            nextYear
        })
    }
    return arrDays;
};

export const parseWeatherData = (data) => {
    let sixteensDays = getSixteenDays();
    let weatherData = [];
    data.forEach((v, index) => {
        weatherData.push(Object.assign(sixteensDays[index], getDataWeather(v)))
    })
    return weatherData;
}