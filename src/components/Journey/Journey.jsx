import React from 'react';
import './Journey.scss';
import {connect} from 'react-redux';
import {setFrom,setTo,showCitySelector} from '../../index/actions';

function Journey(props){
    const {from,to,setFrom,setTo,showCitySelector} = props;
    // 点击切换出发站和终点站
    const handleExchangeStation = () => {
        setFrom(to);
        setTo(from);
    }
    return (
        <div className={"journey-wrapper"}>
            <div
                className="journey-start"
                onClick={() => {showCitySelector(true)}}
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
                onClick={() => showCitySelector(true)}
            >
                <h3 className={"station"}>{to}</h3>
            </div>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        from:state.from,
        to:state.to
    }
}
const mapDispatchToProps = {
    setFrom,
    setTo,
    showCitySelector
}
export default connect(mapStateToProps,mapDispatchToProps)(Journey);