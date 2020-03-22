import React,{useMemo} from 'react';
import './DepartDate.scss';
import dateUtil from '../../common/js/date.js';
import {connect} from 'react-redux';
import {showDateSelector} from '../../index/actions';
import PropTypes from 'prop-types';

function DepartDate(props){
    let {departDate,showDateSelector} = props;
    // 优化出发日期计算逻辑, 当出发当日期的时间戳不变,则不进行重新计算,依赖的变量传入当天0点的时间戳，只要在同一天便不会重新计算。
    const h0 = dateUtil.getTodayUnix(departDate);
    const departDateString = useMemo(() => {
        return dateUtil.formatDate(h0,'yyyy-MM-dd');
    },[h0]);

/*    const departDateString = useMemo(() => {
        console.log("departDate runs");
        return dateUtil.formatDate( dateUtil.getTodayUnix(departDate),'yyyy-MM-dd' );
        // 每次时间戳会变化，即使是在同一天也会重新计算。
    },[departDate]);*/

    const weekArray = ['日','一','二','三','四','五','六'];
    const departWeekString = '周' + weekArray[new Date(departDate).getDay()];
    const isToday = dateUtil.getTodayUnix() === dateUtil.getTodayUnix(departDate);

    const handleSetDepartDate = () => {
        showDateSelector()
    }
    return(
        <div className={'depart-wrapper'}>
            <span className="depart-date">出发日期</span>
            <span
                className="date-text"
                onClick={handleSetDepartDate}
            >{departDateString}</span>
            <span className="week-text">{departWeekString}{ isToday ? "(今天)":"" }</span>
        </div>
    )
}
DepartDate.propTypes = {
    departDate:PropTypes.number.isRequired
}
const mapStateToProps = state => {
    return {
        departDate:state.departDate
    }
}
export default connect(mapStateToProps,{showDateSelector})(DepartDate);