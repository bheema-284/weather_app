import {
    GET_LOCATION,
    WEATHER_ERROR,
    WEATHER_LOADING, WEATHER_ONECALL
} from "./action"

const initial = {
    loading:true,
    weather_loading: false,
    weather_error:false,
    weather_onecall:{},
    curr_location:"",
}

export const weather_reducer = (store = initial, {
    type,
    payload
}) => {
    switch (type) {
        case WEATHER_LOADING:
            return {
                ...store,
                weather_loading: true,
                loading:true
            }
        case WEATHER_ERROR:
            return{
                ...store,
                weather_loading:false,
                weather_error:true,
            }
        case WEATHER_ONECALL:
            return{
                ...store,
                weather_loading:false,
                weather_error:false,
                weather_onecall:payload,
                loading:false
            }
        case GET_LOCATION:
            return {
                ...store,
                weather_loading:false,
                weather_error:false,
                loading:false,
                curr_location:payload,
            }
            default:
                return store
    }
}