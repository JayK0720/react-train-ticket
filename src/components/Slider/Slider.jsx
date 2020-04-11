import React,{
    useState,
    useMemo,
    memo,
    useEffect,
    useRef
} from 'react';
import './Slider.scss';
import PropTypes from 'prop-types';
import useWinSize from '../../common/js/useWinSize.js';

function paddingLeftZero(str){
    if(typeof str === 'number'){
        return ('00'+str).substring((str).toString().length);
    }
    return ('00' + str).substring(str.length);
}

const Slider = memo(function (props){
    const {title,startTime,endTime,onStartChanged,onEndChanged} = props;
    console.log(startTime,endTime);
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

    const startRef = useRef();
    const endRef = useRef();
    const lastStartX = useRef();
    const lastEndX = useRef()
    const sliderWidth = useRef();
    const sliderRef = useRef();

    // 引入获取屏幕总宽度的自定义hook,当宽度改变时重新计算滑块的总宽度;
    const {width} = useWinSize();
    // 计算滑块的总长度,
    useEffect(() => {
        const paddingLeft = parseFloat(window.getComputedStyle(sliderRef.current)['padding-left']);
        sliderWidth.current = width - paddingLeft * 2;
    },[width]);

    // 监听拖动滑块事件,开始时间时获取点击的初始位置,并保存在lastStartX.current;
    const handleStartBegin = event => {
        const touch = event.targetTouches[0];
        lastStartX.current = touch.pageX;
    }
    // 同样监听右侧滑块移动事件并保存在endStartX.current
    const handleEndBegin = event => {
        const touch = event.targetTouches[0];
        lastEndX.current = touch.pageX;
    }
    // 移动滑块时，将此时的位置 - last.current,获取移动的距离，并计算相对滑块总长度 拖动距离百分比
    const handleStartMove = event => {
        const touch = event.targetTouches[0];
        let distance = touch.pageX - lastStartX.current;
        lastStartX.current = touch.pageX;
        // 设置左侧滑块的位置
        setStart (start => {
            return start + (distance / sliderWidth.current) * 100;
        });
    }
    const handleEndMove = event => {
        const touch = event.targetTouches[0];
        let distance = touch.pageX - lastEndX.current;
        lastEndX.current = touch.pageX;
        // 设置右侧滑块当前位置
        setEnd(end => {
            return end + (distance / sliderWidth.current) * 100;
        });
    }
    // 监听每个按钮的点击事件,分别获取点击事件开始的位置 和 移动的位置
    useEffect(() => {
        startRef.current.addEventListener('touchstart',handleStartBegin,false);
        startRef.current.addEventListener('touchmove',handleStartMove,false);
        endRef.current.addEventListener('touchstart',handleEndBegin,false);
        endRef.current.addEventListener('touchmove',handleEndMove,false);
        return () => {
            startRef.current.removeEventListener('touchstart',handleStartBegin,false);
            startRef.current.removeEventListener('touchmove',handleStartMove,false);
            endRef.current.removeEventListener('touchstart',handleEndBegin,false);
            endRef.current.removeEventListener('touchmove',handleEndMove,false);
        }
    });

    // 将拖动修改的事件数据 同步到 TrainFilter组件
    useEffect(() => {
        onStartChanged(startHours)
    },[startHours]);

    useEffect(() => {
        onEndChanged(endHours);
    },[endHours]);

    return (
        <div className={'slider-option'}>
            <h3 className="option-title">{title}</h3>
            <div className="slider" ref={sliderRef}
            >
                <div
                    className="slider-wrapper"
                >
                    <div
                        className="start-btn"
                        style={{
                            left:startPercent+'%'
                        }}
                        ref={startRef}
                    >
                        <span className="start-text">{startText}</span>
                    </div>
                    <div
                        className="slider-range"
                        style={{
                            width:(endPercent - startPercent) + '%',
                            left:startPercent + '%',
                        }}
                    ></div>
                    <div
                        className="end-btn"
                        style={{
                            left:endPercent+'%'
                        }}
                        ref={endRef}
                    >
                        <span className="end-text">{endText}</span>
                    </div>
                </div>
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

