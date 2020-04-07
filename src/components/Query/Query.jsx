import React ,{useCallback,useEffect,useRef}from 'react';
import PropTypes from 'prop-types';
import Header from '../Header/Header';
import TrainList from '../TrainList/TrainList'
import {connect} from 'react-redux';
import './Query.scss';
import {setNextDay,setPrevDay,setTrainList,setTicketTypes,setTrainTypes,setArriveStation,setDepartStation} from '../../actions'
import BScroll from 'better-scroll';
import Bottom from '../Bottom/Bottom';
import CalendarNav from '../CalendarNav/CalendarNav';
import useNav from '../../common/js/useNav';

function Query(props){
    const {
        from,to,departDate,setNextDay,
        setPrevDay,trainList,setTrainList,
        setTicketTypes,setTrainTypes,setArriveStation,setDepartStation,
    } = props;
    const scrollRef = useRef();
    const wrapperRef = useRef();

    // 点击返回按钮时 返回上一页
    const onBack = useCallback(() => {
        window.history.back();
    },[]);

    const {
        isNextDisabled,
        isPrevDisabled,
        handleSetPrevDay,
        handleSetNextDay
    } = useNav(departDate,setPrevDay,setNextDay);
    useEffect(() => {
        fetch("http://121.43.126.106:5000/api/ticket-server/ticket")
            .then(response => response.json())
            .then(({result}) => {
                const {dataMap:{directTrainInfo:{trains,filter}}} = result;
                console.log(filter);
                setTrainList(trains);
                setTicketTypes(filter.ticketType);
                setTrainTypes(filter.trainType);
                setDepartStation(filter.depStation);
                setArriveStation(filter.arrStation);
            })
    },[departDate]);
    useEffect(() => {
        if(!scrollRef.current){
            scrollRef.current = new BScroll(wrapperRef.current,{
                click:true,
                scrollY:true,
                scrollX:false,
                probeType:3
            })
        }else{
            scrollRef.current.refresh();
        }
    },[trainList]);
    return (
        <div className={'query-wrapper'}>
            <div className="date-nav">
                <Header
                    title={`${from} < > ${to}`}
                    show={true}
                    onBack={onBack}
                />
                <CalendarNav
                    departDate={departDate}
                    handleSetPrevDay={handleSetPrevDay}
                    handleSetNextDay={handleSetNextDay}
                    isNextDisabled={isNextDisabled}
                    isPrevDisabled={isPrevDisabled}
                />
            </div>
            <div className="list-wrapper" ref={wrapperRef}>
                <TrainList
                    list={trainList}
                />
            </div>
            <Bottom/>
        </div>
    )
}
Query.propTypes = {
    from:PropTypes.string,
    to:PropTypes.string,
    departDate:PropTypes.number,
    setNextDay:PropTypes.func,
    setPrevDay:PropTypes.func,
    setTicketTypes:PropTypes.func,
    setTrainTypes:PropTypes.func,
    setArriveStation:PropTypes.func,
    setDepartStation:PropTypes.func,
}

const mapStateToProps = state => {
    return {
        from:state.from,
        to:state.to,
        departDate:state.departDate,
        trainList:state.trainList,
    }
}
export default connect(
    mapStateToProps,
    {setNextDay,setPrevDay,setTrainList,setTicketTypes,setTrainTypes,setArriveStation,setDepartStation}
)(Query);