import React from 'react';
import './Journey.scss';
import {connect} from 'react-redux';
import {setFrom,setTo} from '../../index/actions';

function Journey(props){
    const {from,to,setFrom,setTo} = props;
    // 点击切换出发站和终点站
    const handleExchangeStation = () => {
        setFrom(to);
        setTo(from);
    }
    return (
        <div className={"journey-wrapper"}>
            <div className="journey-start">
                <h3 className={"station"}>{from}</h3>
            </div>
            <div
                className="switch-icon"
                onClick={handleExchangeStation}
            >
                <i className="iconfont">&#xe667;</i>
            </div>
            <div className="journey-end">
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
    setTo
}
export default connect(mapStateToProps,mapDispatchToProps)(Journey);