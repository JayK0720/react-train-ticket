import {
    SET_FROM,
    SET_TO,
    SHOW_CITY_SELECTOR,
    HIDE_CITY_SELECTOR,
    TOGGLE_HIGH_SPEED,
    IS_LOADING_CITY_DATA,
    SET_CITY_DATA,
    CITY_DATA_CACHE
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
// 设置是否正在加载城市列表数据
function setIsLoadingCityData(isLoadingCityData){
    return {
        type:IS_LOADING_CITY_DATA,
        playload:isLoadingCityData
    }
}
// 获取城市列表数据
function setCityData(cities){
    return {
        type:SET_CITY_DATA,
        playload:cities
    }
}
// 异步获取城市列表数据
function fetchCityData(){
    return (dispatch,getState) => {
        // isLoadingCityData 默认为false
        const {isLoadingCityData} = getState();
        console.log(isLoadingCityData);
        // 如果当前正在加载城市数据 则直接返回
        if(isLoadingCityData) {
            return;
        };
        // 否则设置isLoadingCityData为true,开始加载数据
        dispatch(setIsLoadingCityData(true));
        // 否则设置为正在加载城市列表数据
        fetch("http://121.43.126.106:5000/api/ticket-server/city?" + Date.now())
            .then(response => response.json())
            .then(cities => {
                dispatch(setCityData(cities));
                dispatch(setIsLoadingCityData(false));
            })
            .catch(() => {
                dispatch(setIsLoadingCityData(false));
            })
    }
}

export {
    setFrom,
    setTo,
    toggleHighSpeed,
    showCitySelector,
    hideCitySelector,
    fetchCityData
};