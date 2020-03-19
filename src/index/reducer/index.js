import {
    SET_FROM,
    SET_TO,
    SHOW_CITY_SELECTOR,
    HIDE_CITY_SELECTOR,
    IS_LOADING_CITY_DATA,
    SET_CITY_DATA,
    SET_STATION_DIRECTION
} from '../actionTypes';

function from(state = "北京",action){
    const {type,playload} = action;
    switch(type){
        case SET_FROM:
            return playload;
        default:
            return state;
    }
}
function to(state = "上海",action){
    const {type,playload} = action;
    switch(type){
        case SET_TO:
            return playload;
        default:
            return state;
    }
}

function citySelector(state = false,action){
    const {type} = action;
    switch(type){
        case SHOW_CITY_SELECTOR:
            return true;
        case HIDE_CITY_SELECTOR:
            return false;
        default:
            return state;
    }
}

function isLoadingCityData(state=false,action){
    const {type,playload} = action;
    switch(type){
        case IS_LOADING_CITY_DATA:
            return playload;
        default:
            return state;
    }
}

function cityData(state={},action){
    const {type,playload} = action;
    switch(type){
        case SET_CITY_DATA:
            return playload;
        default:
            return state;
    }
}

function cityDirection(state='left',action){
    const {type,playload} = action;
    switch(type){
        case SET_STATION_DIRECTION:
            return playload;
        default:
            return state;
    }
}

export {from,to,citySelector,isLoadingCityData,cityData,cityDirection}
