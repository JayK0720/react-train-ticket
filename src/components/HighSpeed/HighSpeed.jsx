import React from 'react';
import PropTypes from 'prop-types';
import './HighSpeed.scss';
import {connect} from 'react-redux';
import {toggleHighSpeed} from '../../actions';

function HighSpeed(props){
    const {highSpeed,toggleHighSpeed} = props;
    return (
        <div className={'high-speed-wrapper'}>
            <label className={'text'}>只看高铁/动车</label>
            <div
                onClick={() => toggleHighSpeed()}
                className={["high-speed-switch",highSpeed ? "checked": ""].join(" ")}
            >
                <div
                    className="switch-icon"
                ></div>
            </div>
        </div>
    )
}
HighSpeed.propTypes = {
    highSpeed:PropTypes.bool.isRequired,
    toggleHighSpeed:PropTypes.func.isRequired
}
const mapStateToProps = state => {
    return {highSpeed:state.highSpeed}
}

export default connect(mapStateToProps,{toggleHighSpeed})(HighSpeed)
