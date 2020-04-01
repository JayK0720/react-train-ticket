import React from 'react';
import './TrainList.scss';

function TrainList(props){
    const {list} = props;
    console.log(list);
    return (
        <ul className={'train-list'}>
            {list.length > 0 && list.map((train,index) => {
                console.log(train);
                return (
                    <li className={'train-item'} key={index}>
                        <p className="train-number">G139</p>
                        <div className={'dStation'}>
                            <div>
                                <em>始</em>
                                <span>北京南</span>
                            </div>
                            <p>
                                13:45
                            </p>
                        </div>
                        <div className="aStation">
                            <div>
                                <em>终</em>
                                <span>上海虹桥</span>
                            </div>
                            <p>20:05</p>
                        </div>
                    </li>
                )
            })}
        </ul>
    )
}

export default TrainList