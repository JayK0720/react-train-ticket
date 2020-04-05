import React from 'react'
import './TrainFilter.scss';
import PropTypes from 'prop-types';

function TrainFilter(props){
    const {show,toggleFilterVisible} = props;
    return (
        <div
            className={['filter-wrapper',!show ? 'disabled' : ""].join(" ")}
        >
            <div className="filter-content">
                <div className="title">
                    <span className={'reset'}>重置</span>
                    <span
                        className="confirm"
                        onClick={toggleFilterVisible}
                    >确定</span>
                </div>
            </div>
        </div>
    )
}
TrainFilter.propTypes = {
    show:PropTypes.bool.isRequired,
    toggleFilterVisible:PropTypes.func.isRequired
}
export default TrainFilter;