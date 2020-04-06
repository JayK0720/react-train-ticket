import {
    SET_FROM,
    SET_TO,
    SHOW_CITY_SELECTOR,
    HIDE_CITY_SELECTOR,
    IS_LOADING_CITY_DATA,
    SET_CITY_DATA,
    SET_STATION_DIRECTION,
    HIDE_DATE_SELECTOR,
    SHOW_DATE_SELECTOR,
    SET_DEPART_DATE,
    TOGGLE_HIGH_SPEED,
    SET_ORDER_TYPE,
    ORDER_DEPART,
    SET_TICKET_TYPES,
    SET_CHECKED_TICKET_TYPES,
    SET_TRAIN_TYPES,
    SET_CHECKED_TRAIN_TYPES,
    SET_DEPART_STATION,
    SET_CHECKED_DEPART_STATION,
    SET_ARRIVE_STATION,
    SET_CHECKED_ARRIVE_STATION,
    SET_DEPART_TIME_START,
    SET_DEPART_TIME_END,
    SET_ARRIVE_TIME_START,
    SET_ARRIVE_TIME_END,
    TOGGLE_FILTER_VISIBLE,
    SHOW_COUNT,
    TOGGLE_TICKET_INFO,
    SET_TRAIN_LIST
} from '../actionTypes';
import dateUtil from '../common/js/date';

export function from(state = "北京",action){
    const {type,playload} = action;
    switch(type){
        case SET_FROM:
            return playload;
        default:
            return state;
    }
}
export function to(state = "上海",action){
    const {type,playload} = action;
    switch(type){
        case SET_TO:
            return playload;
        default:
            return state;
    }
}

export function citySelector(state = false,action){
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

export function isLoadingCityData(state=false,action){
    const {type,playload} = action;
    switch(type){
        case IS_LOADING_CITY_DATA:
            return playload;
        default:
            return state;
    }
}

export function cityData(state={},action){
    const {type,playload} = action;
    switch(type){
        case SET_CITY_DATA:
            return playload;
        default:
            return state;
    }
}


export function cityDirection(state='left',action){
    const {type,playload} = action;
    switch(type){
        case SET_STATION_DIRECTION:
            return playload;
        default:
            return state;
    }
}

export function dateSelector(state= false,action){
    const {type} = action;
    switch(type){
        case SHOW_DATE_SELECTOR:
            return true;
        case HIDE_DATE_SELECTOR:
            return false;
        default:
            return state;
    }
}
// 出发日期reducer, 默认为当前的时间戳
const initialDate = dateUtil.getTodayUnix(Date.now());
export function departDate(state = initialDate,action){
    const {type,playload} = action;
    switch(type){
        case SET_DEPART_DATE:
            return playload;
        default:
            return state;
    }
}

export function highSpeed(state = false,action){
    const {type,playload} = action;
    switch(type){
        case TOGGLE_HIGH_SPEED:
            return playload;
        default:
            return state;
    }
}

export function orderType(state = ORDER_DEPART ,action){
    const {type,playload} = action;
    switch(type){
        case SET_ORDER_TYPE:
            return playload;
        default:
            return state;
    }
}
// 是否显示火车筛选浮层
export function isFilterVisible(state=false,action){
    const {type,playload} = action;
    switch(type){
        case TOGGLE_FILTER_VISIBLE:
            return playload;
        default:
            return state;
    }
}
// 火车车票类型
export function ticketTypes(state = [],action){
    const {type,playload} = action;
    switch(type){
        case SET_TICKET_TYPES:
            return playload;
        default:
            return state;
    }
}
// 火车车次类型
export function trainTypes(state = [],action){
    const {type,playload} = action;
    switch(type){
        case SET_TRAIN_TYPES:
            return playload;
        default:
            return state;
    }
}
// 选中的火车车票类型
export function checkedTicketTypes(state={},action){
    const {type,playload} = action;
    switch(type){
        case SET_CHECKED_TICKET_TYPES:
            return playload;
        default:
            return state;
    }
}
// 选中的火车车次类型
export function checkedTrainTypes(state={},action){
    const {type,playload} = action;
    switch(type){
        case SET_CHECKED_TRAIN_TYPES:
            return playload;
        default:
            return state;
    }
}
// 选中的火车出发站点
export function checkedDepartStation(state={},action){
    const {type,playload} = action;
    switch(type){
        case SET_CHECKED_DEPART_STATION:
            return playload;
        default:
            return state;
    }
}
// 选中的火车到达站点
export function checkedArriveStation(state={},action){
    const {type,playload} = action;
    switch(type){
        case SET_CHECKED_ARRIVE_STATION:
            return playload;
        default:
            return state;
    }
}
// 切换 火车座位 数量信息 和 价格信息
export function ticketInfo(state = SHOW_COUNT,action){
    const {type,playload} = action;
    switch(type){
        case TOGGLE_TICKET_INFO:
            return playload;
        default:
            return state;
    }
}
// 请求到的火车车次数据列表
export function trainList(state = [],action){
    const {type,playload} = action;
    switch(type){
        case SET_TRAIN_LIST:
            return playload;
        default:
            return state;
    }
}
// 火车所有的到达车站站点
export function arriveStation(state =[],action){
    const {type,playload} = action;
    switch(type){
        case SET_ARRIVE_STATION:
            return playload;
        default:
            return state;
    }
}
// 火车所有的出发车站站点
export function departStation(state=[],action){
    const {type,playload} = action;
    switch(type){
        case SET_DEPART_STATION:
            return playload;
        default:
            return state;
    }
}
// 出发开始日期
export function departTimeStart(state=0,action){
    const {type,playload} = action;
    switch(type){
        case SET_DEPART_TIME_START:
            return playload;
        default:
            return state;
    }
}
// 出发截止日期
export function departTimeEnd(state= 24,action){
    const {type,playload} = action;
    switch(type){
        case SET_DEPART_TIME_END:
            return playload;
        default:
            return state;
    }
}
// 到站初始日期
export function arriveTimeStart(state=0,action){
    const {type,playload} = action;
    switch(type){
        case SET_ARRIVE_TIME_START:
            return playload;
        default:
            return state;
    }
}
// 到站截止日期
export function arriveTimeEnd(state= 24,action){
    const {type,playload} = action;
    switch(type){
        case SET_ARRIVE_TIME_END:
            return playload;
        default:
            return state;
    }
}