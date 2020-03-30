import {
    SET_FROM,
    SET_TO,
    SHOW_CITY_SELECTOR,
    HIDE_CITY_SELECTOR,
    TOGGLE_HIGH_SPEED,
    IS_LOADING_CITY_DATA,
    SET_CITY_DATA,
    CITY_DATA_CACHE,
    SET_STATION_DIRECTION,
    SHOW_DATE_SELECTOR,
    HIDE_DATE_SELECTOR,
    SET_DEPART_DATE,
} from '../actionTypes';
// 出发城市
export function setFrom(from){
    return {
        type:SET_FROM,
        playload:from
    }
}
// 终点城市
export function setTo(to){
    return {
        type:SET_TO,
        playload:to
    }
}
// 显示城市选择页面
export function showCitySelector(){
    return {
        type:SHOW_CITY_SELECTOR,
    }
}
// 隐藏城市选择页面
export function hideCitySelector(){
    return {
        type:HIDE_CITY_SELECTOR,
    }
}

// 切换是否选择高铁时,此时派发一个异步action,可以获取当前的highSpeed值,然后对其取反
export function toggleHighSpeed(){
    return (dispatch,getState) => {
        const {highSpeed} = getState();
        return dispatch({
            type:TOGGLE_HIGH_SPEED,
            playload:!highSpeed,
        })
    }
}
// 设置是否正在加载城市列表数据
export function setIsLoadingCityData(isLoadingCityData){
    return {
        type:IS_LOADING_CITY_DATA,
        playload:isLoadingCityData
    }
}
// 获取城市列表数据
export function setCityData(cities){
    return {
        type:SET_CITY_DATA,
        playload:cities
    }
}
// 异步获取城市列表数据
export function fetchCityData(){
    return (dispatch,getState) => {
        // isLoadingCityData 默认为false
        const {isLoadingCityData} = getState();
        // 如果当前正在加载城市数据 则直接返回
        if(isLoadingCityData) {
            return;
        };
        const cacheCity = JSON.parse(window.localStorage.getItem(CITY_DATA_CACHE) || "{}");
        // 当 当前获取城市列表数据的时间 小于 设置的缓存时间, 则直接从本地缓存列表 获取数据即可
        if(Date.now() < cacheCity.expires ) {
            dispatch(setCityData(cacheCity.data));
            return;
        }
        // 否则设置isLoadingCityData为true,开始加载数据
        dispatch(setIsLoadingCityData(true));
        // 否则设置为正在加载城市列表数据
        fetch("http://121.43.126.106:5000/api/ticket-server/city?" + Date.now())
            .then(response => response.json())
            .then(cities => {
                window.localStorage.setItem(
                    CITY_DATA_CACHE,
                    JSON.stringify({
                        //  设置过期时间 为1分钟
                        expires:Date.now() + 1000 * 60,
                        data:cities
                    })
                )
                dispatch(setCityData(cities));
                dispatch(setIsLoadingCityData(false));
            })
            .catch(() => {
                dispatch(setIsLoadingCityData(false));
            })
    }
}
// 设置当前选择的是起点出发城市 还是 终点城市
export function setStationDirection(direction){
    return {
        type : SET_STATION_DIRECTION,
        playload:direction
    }
}
/*
* 设置当前城市列表中被选中的城市,当点击起点时,direction先设置为left,点击终点时,direction为right
* 通过判断 direction的值,将选择的城市分别 设置为 from 和 to,选择城市后再关闭 城市选择列表
* */
export function setSelectedCity(city){
    return (dispatch,getState) => {
        const {direction} = getState();
        if(direction === "left"){
            dispatch( setFrom(city) );
            dispatch(  hideCitySelector() );
        }else{
            dispatch( setTo(city) );
            dispatch( hideCitySelector() );
        }
    }
}
// 显示日期选择器
export function showDateSelector(){
    return {
        type:SHOW_DATE_SELECTOR
    }
}
// 隐藏日期选择器
export function hideDateSelector(){
    return {
        type:HIDE_DATE_SELECTOR
    }
}
// 设置出发日期
export function setDepartDate(date){
    return {
        type:SET_DEPART_DATE,
        playload:date
    }
}

// 设置出发日期为当前日期对下一天
export function setNextDay(){
    return (dispatch,getState) => {
        const {departDate} = getState();
        dispatch({
            type:SET_DEPART_DATE,
            playload:departDate + 86400 * 1000
        })
    }
}
// 设置出发日期为当前日期对前一天
export function setPrevDay(){
    return (dispatch,getState) => {
        const {departDate} = getState();
        dispatch({
            type:SET_DEPART_DATE,
            playload:departDate - 86400 * 1000
        })
    }
}

