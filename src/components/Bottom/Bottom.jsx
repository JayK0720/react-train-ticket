import React from 'react';
import './Bottom.scss';
import '../../common/css/iconfont.css';

function Bottom(props){
    return (
        <div className={'bottom-wrapper'}>
            <ul className={'filter-wrapper'}>
                <li className="filter-item">
                    <i className="iconfont filter-icon">&#xe686;</i>
                    <p className={'filter-text'}>出发早晚</p>
                </li>
                <li className="filter-item">
                    <i className="iconfont filter-icon">&#xe829;</i>
                    <p className={'filter-text'}>只看高铁动车</p>
                </li>
                <li className="filter-item">
                    <i className="iconfont filter-icon">&#xe633;</i>
                    <p className={'filter-text'}>只看有票</p>
                </li>
                <li className="filter-item">
                    <i className="iconfont filter-icon">&#xe62e;</i>
                    <p className={'filter-text'}>综合筛选</p>
                </li>
            </ul>
        </div>
    )
}

export default Bottom;