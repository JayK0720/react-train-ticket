import React ,{useMemo,useCallback}from 'react';
import PropTypes from 'prop-types';
import Header from '../Header/Header';
import TrainList from '../TrainList/TrainList'
import {connect} from 'react-redux';
import './Query.scss';
import dateUtil from '../../common/js/date.js';
import {setNextDay,setPrevDay} from '../../actions'

function Query(props){
    const {from,to,departDate,setNextDay,setPrevDay} = props;
    // 获取今天的时间戳
    const now = dateUtil.getTodayUnix(Date.now());
    const weekArray = ['日','一','二','三','四','五','六'];
    // 分别修改出发日期和星期的格式
    const departDateString = useMemo(() => {
        return dateUtil.formatDate(departDate,'MM月dd日');
    },[departDate]);
    const weekDateString = useMemo(() => {
        return weekArray[new Date(departDate).getDay()];
    },[departDate,weekArray]);
    // 点击返回按钮时 返回上一页
    const onBack = useCallback(() => {
        window.history.back();
    },[])
    // 点击左侧 前一天按钮, 出发日期 切换为上一天,但是如果时间小于今天，则无法再切换
    const handleSetPrevDay = () => {
        if(departDate <= now) return;
        setPrevDay()
    }
    // 点击右侧 下一天按钮，出发日期切换为后一天,无法选择30天后的日期
    const handleSetNextDay = () => {
        if(departDate >= now + 86400000 * 29) return;
        setNextDay()
    }
    return (
        <div className={'query-wrapper'}>
            <div className="date-nav">
                <Header
                    title={`${from} < > ${to}`}
                    show={true}
                    onBack={onBack}
                />
                <div className="date-selector">
                    <p
                        className="prev-day"
                        onClick={handleSetPrevDay}
                    >前一天</p>
                    <div className="calendar-input">
                        <span className={'date-text'}>{departDateString}</span>
                        <span className={'week-text'}>周{weekDateString}</span>
                        <i className="iconfont">&#xe9cf;</i>
                    </div>
                    <p
                        className="next-day"
                        onClick={handleSetNextDay}
                    >后一天</p>
                </div>
            </div>
            <TrainList/>
        </div>
    )
}
Query.propTypes = {
    from:PropTypes.string,
    to:PropTypes.string,
    departDate:PropTypes.number,
}
const mapStateToProps = state => {
    return {
        from:state.from,
        to:state.to,
        departDate:state.departDate
    }
}
export default connect(
    mapStateToProps,
    {setNextDay,setPrevDay}
)(Query);