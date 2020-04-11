import React ,{memo,useRef,useEffect,useState,useCallback} from 'react'
import './TrainFilter.scss';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import BScroll from 'better-scroll';
import Slider from '../Slider/Slider';

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
    const {name,checked,toggle,value} = props;
    return (
        <li
            className={['option-item',checked ? 'checked' : ""].join(" ")}
            onClick={() => {toggle(value)}}
        >{name}</li>
    )
});

OptionItem.propTypes = {
    name:PropTypes.string,
    checked:PropTypes.bool,
    toggle:PropTypes.func,
    value:PropTypes.string
}

const Options = memo(function ({checkedMap,update,title,options}){
    // 点击切换事件，传入当前点击选项的value
    const toggle = useCallback((value) => {
        let newCheckedMap = {...checkedMap};
        if(newCheckedMap[value]){
            delete newCheckedMap[value];
        }else{
            newCheckedMap[value] = true;
        }
        update(newCheckedMap);
    },[update,checkedMap])
    return (
        <div className={'option'}>
            <h3 className={'option-title'}>{title}</h3>
            <ul className={'option-list'}>
                {options.map((option,idx) => {
                    return <OptionItem key={idx} {...option} toggle={toggle} checked={checkedMap[option.value]}/>
                })}
            </ul>
        </div>
    )
})
Options.propTypes = {
    checkedMap:PropTypes.object,
    update:PropTypes.func,
    title:PropTypes.string,
    options:PropTypes.array
}

function TrainFilter(props){
    const {
        show,toggleFilterVisible,
        ticketTypes, trainTypes,
        arriveStation, departStation,
        checkedDepartStation, checkedArriveStation,
        arriveTimeStart, arriveTimeEnd,
        departTimeStart, departTimeEnd,
        checkedTicketTypes, checkedTrainTypes,
        setCheckedDepartStation, setCheckedArriveStation,
        setCheckedTicketTypes, setCheckedTrainTypes,
        setDepartTimeStart, setDepartTimeEnd,
        setArriveTimeStart, setArriveTimeEnd
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
    });
    // 设置一个本地缓存的数据存储选中的数据，初始数据来源于store
    const [localCheckedTrainTypes,setLocalCheckedTrainTypes] = useState(() => {
        return {...checkedTrainTypes};
    }) ;
    const [localCheckedTicketTypes,setLocalCheckedTicketTypes] = useState(() => {
        return {...checkedTicketTypes};
    });
    const [localCheckedDepartStation,setLocalCheckedDepartStation] = useState(() => {
        return {...checkedDepartStation};
    });
    const [localCheckedArriveStation,setLocalCheckedArriveStation] = useState(() => {
        return {...checkedArriveStation};
    });
    // 被选中的数据 使用本地的数据,将更新 座位类型 和 车票类型的函数 抽象为统一的update函数,传递到子组件,再子组件的 点击时间中 更新
    const optionGroup = [
        {
            title:'车次类型',
            options:trainTypes,
            checkedMap:localCheckedTrainTypes,
            update:setLocalCheckedTrainTypes
        },
        {
            title:'车票类型',
            options:ticketTypes,
            checkedMap:localCheckedTicketTypes,
            update:setLocalCheckedTicketTypes
        },
        {
            title:'出发车站',
            options:departStation,
            checkedMap:localCheckedDepartStation,
            update:setLocalCheckedDepartStation
        },
        {
            title:'到达车站',
            options:arriveStation,
            checkedMap:localCheckedArriveStation,
            update:setLocalCheckedArriveStation
        }
    ]

    const [localDepartTimeStart,setLocalDepartTimeStart] = useState(departTimeStart);
    const [localDepartTimeEnd,setLocalDepartTimeEnd] = useState(departTimeEnd);
    const [localArriveTimeStart,setLocalArriveTimeStart] = useState(arriveTimeStart);
    const [localArriveTimeEnd,setLocalArriveTimeEnd] = useState(arriveTimeEnd);

    const confirm = () => {
        setCheckedDepartStation(localCheckedDepartStation);
        setCheckedArriveStation(localCheckedArriveStation);
        setCheckedTicketTypes(localCheckedTicketTypes);
        setCheckedTrainTypes(localCheckedTrainTypes);
        setDepartTimeStart(localDepartTimeStart);
        setDepartTimeEnd(localDepartTimeEnd);
        setArriveTimeStart(localArriveTimeStart);
        setArriveTimeEnd(localArriveTimeEnd);
        toggleFilterVisible();
    }

    return (
        <div
            className={['filter-wrapper',!show ? 'disabled' : ""].join(" ")}
        >
            <div className="filter-content">
                <div className="title">
                    <span className={'reset'}>重置</span>
                    <span
                        className="confirm"
                        onClick={confirm}
                    >确定</span>
                </div>
                <div
                    className="option-wrapper"
                    ref={scrollWrapper}
                >
                    <section className={'option-scroller'}
                    >
                        {optionGroup.map((option,index) => <Options key={index} {...option}/>)}
                        <Slider
                            title={'出发时间'}
                            startTime={localDepartTimeStart}
                            endTime={localDepartTimeEnd}
                            onStartChanged={setLocalDepartTimeStart}
                            onEndChanged={setLocalDepartTimeEnd}
                        />
                        <Slider
                            title={'到达时间'}
                            startTime={localArriveTimeStart}
                            endTime={localArriveTimeEnd}
                            onStartChanged={setLocalArriveTimeStart}
                            onEndChanged={setLocalArriveTimeEnd}
                        />
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
    {
        setCheckedDepartStation,
        setCheckedArriveStation,
        setCheckedTicketTypes,
        setCheckedTrainTypes,
        setDepartTimeStart,
        setDepartTimeEnd,
        setArriveTimeStart,
        setArriveTimeEnd,
    }
)(TrainFilter);