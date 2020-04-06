import React from 'react'
import './TrainFilter.scss';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
    setCheckedDepartStation,
    setCheckedArriveStation,
    setCheckedTrainTypes,
    setCheckedTicketTypes,
    setDepartTimeStart,
    setDepartTimeEnd,
    setArriveTimeStart,
    setArriveTimeEnd
} from '../../actions';


function TrainFilter(props){
    const {
        show,toggleFilterVisible,
        ticketTypes, trainTypes,
        arriveStation, departStation,
        checkedDepartStation, checkedArriveStation,
        arriveTimeStart, arriveTimeEnd,
        departTimeStart, departTimeEnd,
        checkedTicketTypes, checkedTrainTypes,
    } = props;
    return (
        <div
            className={['filter-wrapper',!show ? 'disabled' : ""].join(" ")}
        >
            <div className="filter-content">
                <div className="title">
                    <span className={'reset'}>重置</span>
                    <span
                        className="confirm"
                        onClick={toggleFilterVisible}
                    >确定</span>
                </div>
                <div className="depart-station">
                </div>
                <div className="arrive-station">
                </div>
            </div>
        </div>
    )
}
TrainFilter.propTypes = {
    show:PropTypes.bool.isRequired,
    toggleFilterVisible:PropTypes.func.isRequired,
    ticketTypes:PropTypes.array,
    trainTypes:PropTypes.array,
    arriveStation:PropTypes.array,
    departStation:PropTypes.array,
    departTimeStart:PropTypes.number,
    departTimeEnd:PropTypes.number,
    arriveTimeStart:PropTypes.number,
    arriveTimeEnd:PropTypes.number,
    checkedTicketTypes:PropTypes.object,
    checkedTrainTypes:PropTypes.object,
    checkedDepartStation:PropTypes.object,
    checkedArriveStation:PropTypes.object
}
const mapStateToProps = state => {
    return {
        ticketTypes:state.ticketTypes,
        trainTypes:state.trainTypes,
        arriveStation:state.arriveStation,
        departStation:state.departStation,
        departTimeStart:state.departTimeStart,
        departTimeEnd:state.departTimeEnd,
        arriveTimeStart:state.arriveTimeStart,
        arriveTimeEnd:state.arriveTimeEnd,
        checkedTicketTypes:state.checkedTicketTypes,
        checkedTrainTypes:state.checkedTrainTypes,
        checkedDepartStation:state.checkedDepartStation,
        checkedArriveStation:state.checkedArriveStation
    }
}
export default connect(
    mapStateToProps,
    null
)(TrainFilter);