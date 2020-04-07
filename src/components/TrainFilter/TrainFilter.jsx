import React ,{memo,useRef,useEffect} from 'react'
import './TrainFilter.scss';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import BScroll from 'better-scroll';

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

const OptionItem = memo(function (props){
    const {name} = props;
    return (
        <li
            className={'option-item'}
        >{name}</li>
    )
})

const Options = memo(function (props){
    const {title,options,checkedMap} = props;
    return (
        <div className={'option'}>
            <h3 className={'title'}>{title}</h3>
            <ul className={'option-list'}>
                {options.map((option,idx) => {
                    return <OptionItem
                                key={idx}
                                {...option}
                        />
                })}
            </ul>
        </div>
    )
})

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
    const scrollRef = useRef();
    const scrollWrapper = useRef();
    useEffect(() => {
        if(!scrollRef.current){
            scrollRef.current = new BScroll(scrollWrapper.current,{
                click:true,
                probeType:3,
            })
        }else{
            scrollRef.current.refresh();
        }
    })
    const optionGroup = [
        {
            title:'车次类型',
            options:trainTypes,
            checkedMap:checkedTrainTypes,
        },
        {
            title:'车票类型',
            options:ticketTypes,
            checkedMap:checkedTicketTypes,
        },
        {
            title:'出发车站',
            options:departStation,
            checkedMap:checkedDepartStation,
        },
        {
            title:'到达车站',
            options:arriveStation,
            checkedMap:checkedArriveStation
        }
    ]
    return (
        <div
            className={['filter-wrapper',!show ? 'disabled' : ""].join(" ")}
        >
            <div className="filter-content">
                <div className="top-title">
                    <span className={'reset'}>重置</span>
                    <span
                        className="confirm"
                        onClick={toggleFilterVisible}
                    >确定</span>
                </div>
                <div
                    className="option-wrapper"
                    ref={scrollWrapper}
                >
                    <section className={'option-scroller'}
                    >
                        {optionGroup.map((option,index) => <Options key={index} {...option}/>)}
                    </section>
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