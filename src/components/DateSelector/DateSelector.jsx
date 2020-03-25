import PropTypes from 'prop-types'
import './DateSelector.scss';
import React,{useCallback} from 'react'
import Header from '../Header/Header'
import classnames from 'classnames';
import {connect} from 'react-redux';
import {hideDateSelector} from '../../index/actions';

function Week(props){
    const {week} = props;
    return (
        <tr
            className={'calendar-week'}
        >
            {week.length > 0 && week.map((day,index) =>
                <td
                    key={index}
                    className={'calendar-td'}
                >
                    {new Date(day).getDate()}
                </td>
            )}
        </tr>
    )
}

function Month(props){
    const {startingMonth} = props;
    const startDay = new Date(startingMonth);   // 当前月份1号0时刻的对象
    const currentDay = new Date(startingMonth);
    let days = [];    // 记录每天的0时刻
    // currentDay 作为指针变量,递增每天的日期, 直到递增月份 不等于当前月份
    while(currentDay.getMonth() === startDay.getMonth()){
        days.push( currentDay.getTime() );
        currentDay.setDate( currentDay.getDate() + 1 );
    }
    // 每个月的第一天不一定是星期一,如果第一天 不是星期一, 则在前面 添加 上个月的最后一天
    if(startDay.getDay() > 0){
        for(let i = 1; i < startDay.getDay() + 1; i++){
            days.unshift( startDay.getTime() - 86400000 * i  );
        }
    }
    const lastDay = new Date(days[days.length - 1]);
    // 当前月份最后一天的日期 不是星期六的话，则添加下个月的 前几天
    if(lastDay.getDay() < 6){
        for(let i = 1; i < 7 - lastDay.getDay(); i++  ){
            days.push( lastDay.getTime() + 86400000 * i );
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


function DateSelector (props){
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
                <li className="week-item">日</li>
                <li className="week-item">一</li>
                <li className="week-item">二</li>
                <li className="week-item">三</li>
                <li className="week-item">四</li>
                <li className="week-item">五</li>
                <li className="week-item">六</li>
            </ul>
            <div className="date-selector-tables">
                {sequenceMonth.length > 0 && sequenceMonth.map(((month,index) =>
                    <Month
                        startingMonth={month}
                        key={index}
                    />
                ))}
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