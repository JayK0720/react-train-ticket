import React,{useState,useMemo,memo} from 'react';
import './Slider.scss';
import PropTypes from 'prop-types';

function paddingLeftZero(str){
    return ('00' + str).substring(str.length);
}

const Slider = memo(function (props){
    const {title,startTime,endTime,onStartChanged,onEndChanged} = props;
    // 将初始时间和 结束时间 换算为 100%;
    const [start,setStart] = useState(() => startTime / 24 * 100 );
    const [end,setEnd] = useState(() => endTime / 24 * 100);

    // 初始和结束位置 不能超过 100%，也不能小于 0%;
    const startPercent = useMemo(() => {
        if(start > 100){
            return 100;
        }
        if(start < 0){
            return 0;
        }
        return start;
    },[start]);

    const endPercent = useMemo(() => {
        if(end > 100){
            return 100;
        }
        if(end < 0){
            return 0;
        }
        return end;
    },[end]);

    // 将百分比换算成当前的时间
    const startHours = useMemo(() => {
        return Math.round(startPercent * 24 / 100);
    },[startPercent]);

    const endHours = useMemo(() => {
        return Math.round(endPercent * 24 / 100);
    },[endPercent]);

    // 拖动滑块时 滑块上方显示的 时间文本
    const startText = useMemo(() => {
        return paddingLeftZero(startHours) + ':00';
    },[startHours]);

    const endText = useMemo(() => {
        return paddingLeftZero(endHours) + ':00';
    },[endHours]);

    return (
        <div className={'slider-wrapper'}>
            <h3 className="option-title">{title}</h3>
            <div className="slider">
                <div className="slider-range"></div>
            </div>
        </div>
    )
});

Slider.propTypes = {
    title:PropTypes.string.isRequired,
    startTime:PropTypes.number.isRequired,
    endTime:PropTypes.number.isRequired,
    onStartChanged:PropTypes.func.isRequired,
    onEndChanged:PropTypes.func.isRequired
}

export default Slider;

