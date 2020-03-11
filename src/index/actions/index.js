import {
    SET_FROM,
    SET_TO,
    SHOW_CITY_SELECTOR,
    HIDE_CITY_SELECTOR,
    TOGGLE_HIGH_SPEED
} from '../actionTypes';
// 出发城市
function setFrom(from){
    return {
        type:SET_FROM,
        playload:from
    }
}
// 终点城市
function setTo(to){
    return {
        type:SET_TO,
        playload:to
    }
}
// 显示城市选择页面
function showCitySelector(){
    return {
        type:SHOW_CITY_SELECTOR,
    }
}
// 隐藏城市选择页面
function hideCitySelector(){
    return {
        type:HIDE_CITY_SELECTOR,
    }
}


// 切换是否选择高铁时,此时派发一个异步action,可以获取当前的highSpeed值,然后对其取反
function toggleHighSpeed(){
    return (dispatch,getState) => {
        const {highSpeed} = getState();
        return dispatch({
            type:TOGGLE_HIGH_SPEED,
            playload:!highSpeed,
        })
    }
}
/*// 交换城市
function exchangeFromTo(){
    return (dispatch,getState) => {
        const {from,to} = getState();
        dispatch({
            type:SET_FROM,
            playload:to
        });
        dispatch({
            type:SET_TO,
            playload:from
        })
    }
}*/

export {
    setFrom,
    setTo,
    toggleHighSpeed,
    showCitySelector,
    hideCitySelector
};