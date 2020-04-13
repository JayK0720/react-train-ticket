import React ,{useCallback,useEffect,useState} from 'react';
import {useLocation,useParams} from 'react-router-dom';
import './Ticket.scss';
import Header from '../Header/Header.jsx';
import CalendarNav from '../CalendarNav/CalendarNav.jsx';
import useNav from '../../common/js/useNav';
import {connect} from 'react-redux';
import {setNextDay,setPrevDay} from '../../actions';

function util(str){
	const obj = {};
	if(str.indexOf('?') > -1){
		str = str.substring(1);
	}
	const temp = str.split('&');
	temp.forEach((str,index) => {
		const arr = str.split('=');
		const key = arr[0];
		const value = decodeURIComponent(arr[1]);
		obj[key] = value;
	});
	return obj;
}

function Ticket(props){
	const {setNextDay,setPrevDay,departDate} = props;
	const location = useLocation();

	const searchObj = util(location.search);
	console.log(searchObj);
	const onBack = useCallback(() => {
		window.history.back();		
	},[]);

	const [detail,setDetail] = useState({});
	const {
		isNextDisabled,
        isPrevDisabled,
        handleSetPrevDay,
        handleSetNextDay,
    } = useNav(departDate,setPrevDay,setNextDay);

    useEffect(() => {
    	fetch(`http://121.43.126.106:5000/api/ticket-server/detail${location.search}`)
    	.then(response => response.json())
    	.then(({result}) => {
    		const {detail,candidates} = result;
    		setDetail(detail);
    		console.log(detail);
    	})
    });
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
			<div className='detail-wrapper'>
				<div className='ticket-detail'>
					<div className='train-depart'>
						<p className='station-text depart-station'>{searchObj.departStation}</p>
						<p className='depart-time'>{detail.departTimeStr}</p>
						<p className='depart-date'></p>
					</div>
					<div className='train-info'>
						<p className='trainNumber'>{searchObj.trainNumber}</p>
						<p className='train-station-list'>时刻表</p>
						<p className='duration'>耗时{detail.durationStr}</p>
					</div>
					<div className='train-arrive'>
						<p className='station-text arrive-station'>{searchObj.arriveStation}</p>
						<p className='arrive-time'>{detail.arriveTimeStr}</p>
						<p className='arrive-date'></p>
					</div>
				</div>
			</div>
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