import PropTypes from 'prop-types'
import './DateSelector.scss';
import React,{useCallback} from 'react'
import Header from '../Header/Header'
import classnames from 'classnames';
import {connect} from 'react-redux';
import {hideDateSelector} from '../../index/actions';

function DateSelector (props){
    const {dateSelectorVisible,hideDateSelector} = props;
    const onBack = useCallback(() => {
        hideDateSelector();
    },[])
    return (
        <div
            className={classnames(
                'date-selector-wrapper',
                {'hidden':!dateSelectorVisible})
            }
        >
            <Header
                title={'选择日期'}
                show={true}
                onBack={onBack}
            />
            <div className="date-selector-tables">

            </div>
        </div>
    )
}
DateSelector.propTypes = {
    dateSelectorVisible:PropTypes.bool.isRequired,
    hideDateSelector:PropTypes.func.isRequired
}
const mapStateToProps = state => {
    return {dateSelectorVisible:state.dateSelectorVisible}
}
export default connect(
    mapStateToProps,
    {hideDateSelector}
)(DateSelector)