import React  from 'react';
import './Header.scss';
import '../../common/css/iconfont.css';
import PropTypes from 'prop-types';
export default function Header(props){
    const {title,onBack} = props;
    return (
        <div className="header">
            <div
                className="icon-back"
                onClick={onBack}
            >
                <i className={"iconfont"}>&#xe64e;</i>
            </div>
            <h1 className={"title"}>{title}</h1>
        </div>
    )
}
Header.propTypes = {
    title:PropTypes.string,
    onBack:PropTypes.func
}














