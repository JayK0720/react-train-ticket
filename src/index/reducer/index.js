import {
    SET_FROM,
    SET_TO,
    SET_CITY_SELECTOR_VISIBLE,
    SET_DATE_SELECTOR_VISIBLE,
    TOGGLE_HIGH_SPEED,
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
export {from,to}
