import React from 'react';
import './DepartDate.scss';

function DepartDate(){
    const date = new Date();
    const time = () => {
        let month = date.getMonth() + 1;
        let day = date.getDay();
        return month + '月' + day + '日';
    }
    const week = () => {
        const weekArray = ['日','一','二','三','四','五','六'];
        return '周' + weekArray[date.getDay()];
    }
    return(
        <div className={'depart-wrapper'}>
            <span className="depart-date">出发日期</span>
            <span className="date-text">{time()}</span>
            <span className="week-text">{week()}</span>
        </div>
    )
}

export default DepartDate;