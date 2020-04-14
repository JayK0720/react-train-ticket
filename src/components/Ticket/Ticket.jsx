import React ,{useCallback,useEffect,useState,lazy,Suspense,useRef} from 'react';
import {useLocation} from 'react-router-dom';
import './Ticket.scss';
import Header from '../Header/Header.jsx';
import CalendarNav from '../CalendarNav/CalendarNav.jsx';
import useNav from '../../common/js/useNav';
import {connect} from 'react-redux';
import {setNextDay,setPrevDay} from '../../actions';
import Loading from '../Loading/Loading.jsx';
// 异步加载组件
let Schedule = lazy(() => import('../Schedule/Schedule.jsx'));

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
	const scheduleRef = useRef();
	const searchObj = util(location.search);

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
    	});
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
						<p className='depart-time'>{searchObj.dTime}</p>
					</div>
					<div className='train-info'>
						<p className='trainNumber'>{searchObj.trainNumber}</p>
						<p 
							className='train-station-list' 
							onClick={() => scheduleRef.current.showSchedule()}
						>时刻表</p>
						<p className='duration'>耗时{searchObj.time}</p>
					</div>
					<div className='train-arrive'>
						<p className='station-text arrive-station'>{searchObj.arriveStation}</p>
						<p className='arrive-time'>{searchObj.aTime}</p>
					</div>
				</div>
			</div>
			<Suspense fallback={<Loading/>}>
				<Schedule
					ref={scheduleRef}
				/>
			</Suspense>
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