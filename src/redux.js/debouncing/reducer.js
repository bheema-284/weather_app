import { GET_ALL_DATA, GET_CITIES, GET_DATA_FAILURE, GET_DATA_LOADING, GET_DATA_SUCCESS } from "./action"

const init = {
    get_data_loading : false,
    get_data_success : [],
    get_data_failure:false,
    all_city_data : [],
    cities:true,
}

export const debouncing = (store=init,{type, payload}) =>{
    switch(type){
        case GET_DATA_LOADING:
            return {
                ...store,
                get_data_loading:true,
            }
        case GET_DATA_SUCCESS:
            return {
                ...store,
                get_data_success:payload,
                get_data_loading:false,
                get_data_failure:false,
            }
        case GET_DATA_FAILURE:
            return {
                ...store,
                get_data_loading:false,
                get_data_failure:true
            }
        case GET_ALL_DATA:
            return{
                ...store,
                get_data_loading:false,
                get_data_failure:false,
                all_city_data:payload,
            }
        case GET_CITIES:
            return{
                ...store,
                cities:true,
            }
        default :
        return store
    }
}