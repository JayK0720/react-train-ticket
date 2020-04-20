import React ,{useCallback,useEffect,useState,lazy,Suspense} from 'react';
import {useLocation} from 'react-router-dom';
import './Ticket.scss';
import Header from '../Header/Header.jsx';
import CalendarNav from '../CalendarNav/CalendarNav.jsx';
import useNav from '../../common/js/useNav';
import {connect} from 'react-redux';
import {setNextDay,setPrevDay,setTrainArrive,setTrainDepart,toggleScheduleVisible} from '../../actions';
import Loading from '../Loading/Loading.jsx';
import Candidate from '../Candidate/Candidate.jsx';
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
	const {
		setNextDay,
		setPrevDay,
		departDate,
		setTrainDepart,
		setTrainArrive,
		scheduleVisible,
		toggleScheduleVisible
	} = props;
	const location = useLocation();
	const searchObj = util(location.search);

	const onBack = useCallback(() => {
		window.history.back();
	},[]);

	const [candidates,setCandidates] = useState([]);

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
    		const {candidates} = result;
    		setCandidates(candidates);
    	});
    },[]);
    // 设置当前行程的出发车站和达到车站
    useEffect(() => {
    	setTrainArrive(searchObj.arriveStation);
    	setTrainDepart(searchObj.departStation);
    },[setTrainArrive,setTrainDepart,searchObj.arriveStation,searchObj.departStation]);
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
							onClick={() => {toggleScheduleVisible()}}
						>时刻表</p>
						<p className='duration'>耗时{searchObj.time}</p>
					</div>
					<div className='train-arrive'>
						<p className='station-text arrive-station'>{searchObj.arriveStation}</p>
						<p className='arrive-time'>{searchObj.aTime}</p>
					</div>
				</div>
				<Candidate
					candidates={candidates}
				/>
			</div>
			<Suspense fallback={<Loading/>}>
				{scheduleVisible && <Schedule/>}
			</Suspense>
		</div>
	)
}
const mapStateToProps = state => {
	return {
		departDate:state.departDate,
		scheduleVisible:state.scheduleVisible
	};
}
export default connect(
	mapStateToProps,
	{
		setNextDay,
		setPrevDay,
		setTrainDepart,
		setTrainArrive,
		toggleScheduleVisible
	}
)(Ticket);
