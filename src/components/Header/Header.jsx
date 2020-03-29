import React  from 'react';
import './Header.scss';
import '../../common/css/iconfont.css';
import PropTypes from 'prop-types';
export default function Header(props){
    const {title,show,onBack} = props;
    return (
        <div className="header">
            {/*通用组件,默认不显示左侧的返回按钮,接受一个函数,当点击时执行不同的操作*/}
            <div
                className={['icon-back', show ? "" : "hidden" ].join(" ")}
                onClick={() => onBack()}
            >
                <i className="iconfont">&#xe64e;</i>
            </div>
            <h1 className={"title"}>{title}</h1>
        </div>
    )
}
Header.propTypes = {
    title:PropTypes.string.isRequired,
    show:PropTypes.bool,
    onBack:PropTypes.func
}














