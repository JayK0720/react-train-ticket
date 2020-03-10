import {
    SET_FROM,
    SET_TO,
    SET_CITY_SELECTOR_VISIBLE,
    SET_DATE_SELECTOR_VISIBLE,
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
// 是否显示城市选择页面
function setCitySelectorVisible(citySelectorVisible){
    return {
        type:SET_CITY_SELECTOR_VISIBLE,
        playload:citySelectorVisible
    }
}
// 是否显示日期显示页面
function setDateSelectorVisible(dateSelectorVisible){
    return {
        type:SET_DATE_SELECTOR_VISIBLE,
        playload:dateSelectorVisible
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
// 交换城市
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
}

export {
    setFrom,
    setTo,
    setCitySelectorVisible,
    setDateSelectorVisible,
    toggleHighSpeed,
    exchangeFromTo
};