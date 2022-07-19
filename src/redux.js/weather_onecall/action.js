import axios from "axios";

export const WEATHER_LOADING = "WEATHER_LOADING";
export const WEATHER_ERROR = "WEATHER_ERROR";
export const WEATHER_ONECALL = "WEATHER_ONECALL";
export const GET_LOCATION = "GET_LOCATION";

export const weatherLoading = () => ({
    type: WEATHER_LOADING,
});

export const weather_error = () => ({
    type: WEATHER_ERROR,
})

export const weatherOnecall = (payload) => ({
    type: WEATHER_ONECALL,
    payload,
})

export const get_location = (payload) => ({
    type:GET_LOCATION,
    payload,
})

export const getOnecall = (lat, lon) => (dispatch) => {
    dispatch(weatherLoading())
    axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutelyalerts&units=metric&appid=e4c70ce6a6821649a416cb9521d5f4f8`)
        .then(res => dispatch(weatherOnecall(res.data)))
        .catch(error => dispatch(weather_error()));
}

export const getLocation = (lat, lon) => (dispatch) => {
    dispatch(weatherLoading());
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=e4c70ce6a6821649a416cb9521d5f4f8`)
    .then(res=>dispatch(get_location(res.data.name)))
    .catch(error=>dispatch(weather_error()));
}