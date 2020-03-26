import PropTypes from 'prop-types'
import './DateSelector.scss';
import React,{useCallback} from 'react'
import Header from '../Header/Header'
import {connect} from 'react-redux';
import {hideDateSelector} from '../../index/actions';
import dateUtil from '../../common/js/date';
import classnames from 'classnames';

function Day(props){
    const {day} = props;
    const now = dateUtil.getTodayUnix(Date.now());
    const date = new Date( day.date ).getDay();
    // 给 每个td 默认设置一个 通用的 calendar-td 类名
    const classes = ['calendar-td'];
    // 出发日期无法选择为 过去的某天, 如果td日期的0时刻小于 当天的0时刻，则添加一个类名disabled
    // 当日期 在上个月的 最后几天 或者 下个月的 前几天也 添加类名 disabled
    if( day.date < now || day.flag === 'disabled'){
        classes.push('disabled');
    }
    // 如果td的日期 在星期六 或者 星期日 则 添加一个 weekend 类名
    if([0,6].includes( date )){
        classes.push('weekend');
    }
    // 每次只能提前预定30天的火车票,如果 大于这个时间, 则同样添加类名 disabled
    if( day.date > now + 86400000 * 29 ){
        classes.push('disabled');
    }
    // 判断是否是当前
    if(now === day.date){
        classes.push('today');
    }
    return (
        <td
            className={classes.join(" ")}
        >{new Date(day.date).getDate()}</td>
    )
}
Day.propTypes = {
    day:PropTypes.object.isRequired
}
function Week(props){
    const {week} = props;
    return (
        <tr
            className={'calendar-week'}
        >
            {week.length > 0 && week.map((day,index) =>
                <Day
                    key={index}
                    day={day}
                />
            )}
        </tr>
    )
}
Week.propTypes = {
    week:PropTypes.array.isRequired
}

function Month(props){
    const {startingMonth} = props;
    const startDay = new Date(startingMonth);   // 当前月份1号0时刻的对象
    const currentDay = new Date(startingMonth);
    let days = [];    // 记录每天的0时刻
    // currentDay 作为指针变量,递增每天的日期, 直到递增月份 不等于当前月份
    while(currentDay.getMonth() === startDay.getMonth()){
        days.push( {
            date:currentDay.getTime(),
            flag:"current"
        } );
        currentDay.setDate( currentDay.getDate() + 1 );
    }
    // 每个月的第一天不一定是星期一,如果第一天 不是星期一, 则在前面 添加 上个月的最后一天
    if(startDay.getDay() > 0){
        for(let i = 1; i < startDay.getDay() + 1; i++){
            days.unshift( {
                date:startDay.getTime() - 86400000 * i ,
                flag:"disabled"
            } );
        }
    }
    const lastDay = new Date(days[days.length - 1].date);
    // 当前月份最后一天的日期 不是星期六的话，则添加下个月的 前几天
    if(lastDay.getDay() < 6){
        for(let i = 1; i < 7 - lastDay.getDay(); i++  ){
            days.push({
                date: lastDay.getTime() + 86400000 * i,
                flag:"disabled"
            });
        }
    }
    const weeks = [];
    for(let row = 0; row < days.length / 7; row++){
        const week = days.slice( row * 7, (row+1)*7 );
        weeks.push(week);
    }
    return (
        <div className="month">
            <h3 className="calendar-title">
                {startDay.getFullYear()}年{startDay.getMonth() + 1}月
            </h3>
            <table className={'calendar-table'}>
                <tbody>
                {weeks.length > 0 && weeks.map((week,index) =>
                    <Week
                        week={week}
                        key={index}
                    />
                )}
                </tbody>
            </table>
        </div>
    )
}
Month.propTypes = {
    startingMonth:PropTypes.number.isRequired
}
function DateSelector (props){
    const week = ['日','一','二','三','四','五','六'];
    const {dateSelectorVisible,hideDateSelector} = props;
    const onBack = useCallback(() => {
        hideDateSelector();
    },[]);
    const date = new Date();
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    date.setDate(1);
    const sequenceMonth = [date.getTime()];
    date.setMonth( date.getMonth() + 1 );
    sequenceMonth.push( date.getTime() );
    return (
        <div
            className={classnames(
                'date-selector-wrapper',
                {'hidden':!dateSelectorVisible})
            }
        >
            <Header
                title={'选择日期'}
                show={true}
                onBack={onBack}
            />
            <ul className="top-week">
                {week.length > 0 && week.map((week,index) =>
                    <li className="week-item" key={index}>{week}</li>
                )}
            </ul>
            <div className="calendar-wrapper">
                <div className="date-selector-tables">
                    {sequenceMonth.length > 0 && sequenceMonth.map(((month,index) =>
                        <Month
                            startingMonth={month}
                            key={index}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
DateSelector.propTypes = {
    dateSelectorVisible:PropTypes.bool.isRequired,
    hideDateSelector:PropTypes.func.isRequired
}
const mapStateToProps = state => {
    return {dateSelectorVisible:state.dateSelectorVisible}
}
export default connect(
    mapStateToProps,
    {hideDateSelector}
)(DateSelector)