import React from 'react';
import './Journey.scss';
import {connect} from 'react-redux';
import {setFrom,setTo,showCitySelector,setStationDirection} from '../../actions';

function Journey(props){
    const {from,to,setFrom,setTo,showCitySelector,setStationDirection} = props;
    // 点击切换出发站和终点站
    const handleExchangeStation = () => {
        setFrom(to);
        setTo(from);
    }
    const handleStartStation = () => {
        showCitySelector(true);
        setStationDirection("left");
    }
    const handleEndStation = () => {
        showCitySelector(true);
        setStationDirection("right");
    }
    return (
        <div className={"journey-wrapper"}>
            <div
                className="journey-start"
                onClick={handleStartStation}
            >
                <h3 className={"station"}>{from}</h3>
            </div>
            <div
                className="switch-icon"
                onClick={handleExchangeStation}
            >
                <i className="iconfont">&#xe667;</i>
            </div>
            <div
                className="journey-end"
                onClick={handleEndStation}
            >
                <h3 className={"station"}>{to}</h3>
            </div>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        from:state.from,
        to:state.to,
    }
}
const mapDispatchToProps = {
    setFrom,
    setTo,
    showCitySelector,
    setStationDirection
}
export default connect(mapStateToProps,mapDispatchToProps)(Journey);