import React from 'react';
import './Bottom.scss';
import '../../common/css/iconfont.css';
import {connect} from 'react-redux';
import {toggleOrderType,toggleHighSpeed,toggleTicketInfo} from '../../actions';
import {ORDER_DEPART,SHOW_PRICE} from '../../actionTypes';

const Bottom = function (props){
    const {
        orderType,
        toggleOrderType,
        toggleHighSpeed,
        toggleTicketInfo,
        ticketInfo,
        highSpeed
    } = props;
    return (
        <div className={'bottom-wrapper'}>
            <ul className={'filter-wrapper'}>
                <li
                    className="filter-item order-type"
                    onClick={toggleOrderType}
                >
                    <i className="iconfont filter-icon">&#xe686;</i>
                    <p className={'filter-text'}>
                        {orderType === ORDER_DEPART
                            ? '出发 早->晚'
                            : '耗时 短->长'
                        }
                    </p>
                </li>
                <li
                    className={["filter-item",highSpeed ? 'active' : ''].join(" ")}
                    onClick={toggleHighSpeed}
                >
                    <i className="iconfont filter-icon">&#xe829;</i>
                    <p className={'filter-text'}>只看高铁动车</p>
                </li>
                <li
                    className="filter-item ticket-info"
                    onClick={toggleTicketInfo}
                >
                    <i className="iconfont filter-icon">&#xe627;</i>
                    <p className={'filter-text'}>
                        {
                            ticketInfo === SHOW_PRICE
                            ? '显示票价'
                            : '显示余票'
                        }
                    </p>
                </li>
                <li className="filter-item">
                    <i className="iconfont filter-icon">&#xe62e;</i>
                    <p className={'filter-text'}>综合筛选</p>
                </li>
            </ul>
        </div>
    )
}
const mapStateToProps = state => {
    return {
        orderType:state.orderType,
        ticketInfo:state.ticketInfo,
        highSpeed:state.highSpeed
    }
}
const mapStateToDispatch = {
    toggleOrderType,
    toggleHighSpeed,
    toggleTicketInfo
}
export default connect(
    mapStateToProps,
    mapStateToDispatch
)(Bottom);