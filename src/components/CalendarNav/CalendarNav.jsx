import React, {useMemo} from 'react'
import './CalendarNav.scss';
import PropTypes from 'prop-types';
import dateUtil from '../../common/js/date';

function CalendarNav(props){
    const {
            departDate,
            handleSetPrevDay,
            handleSetNextDay,
            isNextDisabled,
            isPrevDisabled
        } = props;
    // 获取今天的时间戳
    const weekArray = ['日','一','二','三','四','五','六'];
    // 分别修改出发日期和星期的格式
    const departDateString = useMemo(() => {
        return dateUtil.formatDate(departDate,'MM月dd日');
    },[departDate]);
    const weekDateString = useMemo(() => {
        return weekArray[new Date(departDate).getDay()];
    },[departDate,weekArray]);

    return (
        <div className="date-selector">
            <p
                className={['prev-day',isPrevDisabled ? "disabled" : ""].join(" ")}
                onClick={handleSetPrevDay}
            >前一天</p>
            <div className="calendar-input">
                <span className={'date-text'}>{departDateString}</span>
                <span className={'week-text'}>周{weekDateString}</span>
                <i className="iconfont">&#xe9cf;</i>
            </div>
            <p
                className={["next-day",isNextDisabled ? "disabled" : ""].join(" ")}
                onClick={handleSetNextDay}
            >后一天</p>
        </div>
    )
}
CalendarNav.propTypes = {
    departDate:PropTypes.number,
    handleSetPrevDay:PropTypes.func,
    handleSetNextDay:PropTypes.func,
    isNextDisabled:PropTypes.bool,
    isPrevDisabled:PropTypes.bool,
}
export default CalendarNav;