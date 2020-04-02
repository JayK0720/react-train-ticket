import React from 'react';
import './TrainList.scss';
import '../../common/css/iconfont.css';

function TrainList(props){
    const {list} = props;
    console.log(list);
    return (
        <ul className={'train-list'}>
            {list.length > 0 && list.map((train,index) => {
                console.log(train);
                return (
                    <li className={'train-item'} key={index}>
                        <p className="train-number">{train.trainNumber}</p>
                        <div className="station-wrapper">
                            <div className={'dStation'}>
                                <div className={'start-wrapper'}>
                                    <em className={'start-text'}>始</em>
                                    <span className={'start-station'}>{train.dStation}</span>
                                </div>
                                <p className={'start-time'}>{train.dTime}</p>
                            </div>
                            <div className="during-time">
                                <p className={'time-text'}>{train.time}</p>
                            </div>
                            <div className="aStation">
                                <div className={'end-wrapper'}>
                                    <em className={'end-text'}>终</em>
                                    <span className={'end-station'}>{train.aStation}</span>
                                </div>
                                <p className={'end-time'}>{train.aTime}</p>
                            </div>
                        </div>
                        <div className="arrow-down">
                            <i className="iconfont">&#xe610;</i>
                        </div>
                    </li>
                )
            })}
        </ul>
    )
}

export default TrainList