import React from 'react';
import './TrainList.scss';
import '../../common/css/iconfont.css';
import {connect} from 'react-redux';
import {SHOW_COUNT} from '../../actionTypes';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';

function TrainList(props){
    const {list,ticketInfo,departDate} = props;
    const showTicketCount = (count) => {
        if(count >= 10){
            return <span className={'has-ticket'}>有</span>
        }else if(count > 0 && count < 10){
            return <span>{count}张</span>
        }else{
            return <span className={'no-ticket'}>无</span>
        }
    }
    const showTicketPrice = (price) => {
        return <span> ¥{price}</span>
    }
    return (
        <ul className={'train-list'}>
            {list.length > 0 && list.map((train,index) => {
                return (
                    <NavLink 
                        to={`/ticket?date=${departDate}&trainNumber=${train.trainNumber}&departStation=${train.dStation}&arriveStation=${train.aStation}&dTime=${train.dTime}&aTime=${train.aTime}&time=${train.time}`}
                        className={'ticket-link'} 
                        key={index}
                    >
                        <li className={'train-item'} >
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
                                                {ticketInfo === SHOW_COUNT
                                                    ? showTicketCount(ticket.count)
                                                    : showTicketPrice(ticket.price)
                                                }
                                            </li>)
                                    })}
                                </ul>
                            </div>
                        </li>
                    </NavLink>
                )
            })}
        </ul>
    )
}
TrainList.propTypes = {
    list:PropTypes.array,
    ticketInfo:PropTypes.string
}
const mapStateToProps = state => {
    return {
        ticketInfo:state.ticketInfo,
        departDate:state.departDate
    }
}
export default connect(
    mapStateToProps,
    null
)(TrainList)