import React  from 'react';
import './Header.scss';
import '../../common/css/iconfont.css';
import PropTypes from 'prop-types';
export default function Header(props){
    const {title} = props;
    return (
        <div className="header">
            <h1 className={"title"}>{title}</h1>
        </div>
    )
}
Header.propTypes = {
    title:PropTypes.string,
    onBack:PropTypes.func
}














