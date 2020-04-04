import React from 'react';
import './TrainList.scss';
import '../../common/css/iconfont.css';

function TrainList(props){
    const {list} = props;
    const TicketInfo = function(count){

    }
    return (
        <ul className={'train-list'}>
            {list.length > 0 && list.map((train,index) => {
                console.log(train);
                return (
                    <li className={'train-item'} key={index}>
                        <div className="train-info">
                            <p className="train-number">{train.trainNumber}</p>
                            <div className="station-wrapper">
                                <div className={'dStation'}>
                                    <div className={'start-wrapper'}>
                                        <em className={'start-text'}>始</em>
                                        <span className={'start-station'}>{train.dStation}</span>
                                    </div>
                                    <p className={'start-time'}>{train.dTime}</p>
                                </div>
                                <div className="during-time">
                                    <div className={'card-icon'}><i className="iconfont">&#xe620;</i></div>
                                    <div className={'arrow-icon'}><i className="iconfont">&#xe676;</i></div>
                                    <p className={'time-text'}>{train.time}</p>
                                </div>
                                <div className="aStation">
                                    <div className={'end-wrapper'}>
                                        <em className={'end-text'}>终</em>
                                        <span className={'end-station'}>{train.aStation}</span>
                                    </div>
                                    <p className={'end-time'}>{train.aTime}</p>
                                </div>
                            </div>
                            <div className="arrow-down">
                                <i className="iconfont">&#xe610;</i>
                            </div>
                        </div>
                        <div className="ticket-info">
                            <ul className={'ticket-list'}>
                                {train.ticketInfos.map((ticket,index) => {
                                    return (
                                        <li
                                            key={index}
                                            className={['ticket-item',ticket.count === 0 ? 'disabled':""].join(" ")}
                                        >
                                            <span className={'ticket-type'}>{ticket.type}: </span>
                                            {ticket.count >= 10
                                                ? (<span className={'has-ticket'}>有</span>)
                                                : ticket.count > 0
                                                ? (<span>{ticket.count}张</span>)
                                                : (<span className={'no-ticket'}>无</span>)
                                            }
                                        </li>)
                                })}
                            </ul>
                        </div>
                    </li>
                )
            })}
        </ul>
    )
}

export default TrainList