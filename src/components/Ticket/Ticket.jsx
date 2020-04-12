import React ,{useCallback} from 'react';
import {useLocation,useParams} from 'react-router-dom';
import './Ticket.scss';
import Header from '../Header/Header.jsx';
import CalendarNav from '../CalendarNav/CalendarNav.jsx';
import useNav from '../../common/js/useNav';
import {connect} from 'react-redux';
import {setNextDay,setPrevDay} from '../../actions';

function Ticket(props){
	const {setNextDay,setPrevDay,departDate} = props;
	let location = useParams();
	console.log(location);	
	
	const onBack = useCallback(() => {
		window.history.back();		
	},[]);

	const {
		isNextDisabled,
        isPrevDisabled,
        handleSetPrevDay,
        handleSetNextDay,
    } = useNav(departDate,setPrevDay,setNextDay);

	return (
		<div className={'ticket-wrapper'}>
			<Header
				title={'确认订单'}
				show={true}
				onBack={onBack}
			/>
			<CalendarNav
				departDate={departDate}
				isNextDisabled={isNextDisabled}
				isPrevDisabled={isPrevDisabled}
				handleSetPrevDay={handleSetPrevDay}
				handleSetNextDay={handleSetNextDay}
			/>
		</div>
	)
}
const mapStateToProps = state => {
	return {
			departDate:state.departDate
	};
}
export default connect(
	mapStateToProps,
	{
		setNextDay,
		setPrevDay
	}
)(Ticket);