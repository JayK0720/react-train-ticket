import React  from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {toggleScheduleVisible} from '../../actions'
import './Schedule.scss';

function paddingLeftZero(str){
	if(typeof str === 'number'){
		str = str + '';
	}
	return ('00'+str).substring(str.length);
}
function ScheduleRow(props){
	/*
	当前组件会接受6条数据,是否是当前列车的出发站点,是否是当前车站的到达站点,是否是行程的出发站点
	是否是行程的达到站点，是否是出发站点之前,是否是出发站点之后。
	* */
	const {
		station,
		arriveTime,
		departTime,
		stay,
		isStartStation,
		isEndStation,
		isDepartStation,
		isArriveStation,
		isBeforeDepartStation,
		isAfterArriveStation,
		index
	} = props;
	return (
	// 行程列表的每一行
		<li className={'schedule-row'}>
			{/*每一行前面的序号*/}
			<div
				className={['icon',(isStartStation || isEndStation) ? 'icon-red': ""].join(" ")}
			>
				{
					isStartStation ? '出'
					: isEndStation ? '到'
					: paddingLeftZero(index)
				}
			</div>
			{/* 因为在出发车站之前和达到车站之后 整行的样式都是灰色的,再独立在一个div里面*/}
			<div className={['row',(isBeforeDepartStation || isAfterArriveStation) ? 'grey' : "" ].join(" ")}>
				<div
					className={['current-station',(isStartStation || isEndStation) ? 'red':""].join(" ")}
				>
					{station}
				</div>
				<div
					className={['arrive-time',isArriveStation ? 'red':" "].join(" ")}
				>
					{isStartStation ? '始发站' : arriveTime}
				</div>
				<div
					className={['depart-time',isDepartStation ? 'red':" "].join(" ")}
				>
					{isEndStation ? '终到站' : departTime}
				</div>
				<div className={'stay-time'}>
					{(isStartStation || isEndStation) ? '-' : (stay+'分')}
				</div>
			</div>
		</li>
	)
}
ScheduleRow.propTypes = {
	station:PropTypes.string,
	arriveTime:PropTypes.string,
	departTime:PropTypes.string,
	stay:PropTypes.number,
	isStartStation:PropTypes.bool,
	isEndStation:PropTypes.bool,
	isDepartStation:PropTypes.bool,
	isArriveStation:PropTypes.bool,
	isBeforeDepartStation:PropTypes.bool,
	isAfterEndStation:PropTypes.bool,
	index:PropTypes.number
}

class Schedule extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			scheduleList:[]
		}
	}
	componentDidMount(){
		fetch('http://jayk23.com:5000/api/ticket-server/schedule')
			.then(response => response.json())
			.then(({result}) => {
				const scheduleList = [...result];
				// 当趟列车出发站和达到站
				const startIndex = 0;
				const endIndex = scheduleList.length - 1;
				// 选择站点的出发站和达到站在当趟列车所经过的站点序号
				const departIndex = scheduleList.findIndex(({station}) => station === this.props.trainDepart);
				const arriveIndex = scheduleList.findIndex(({station}) => station === this.props.trainArrive);
				scheduleList.forEach((station,index) => {
				//	 当 序号小于出发站点的 在当趟列车途径站点的序号时, 则beforeDepartStation为true
					if(index < departIndex){
						Object.assign(station,{
							isDepartStation:false,
							isArriveStation:false,
							isBeforeDepartStation:true,
							isAfterArriveStation:false
						})
						// 当index === DepartIndex， 则当前站点为 departStation
					}else if(index === departIndex){
						Object.assign(station,{
							isDepartStation:true,
							isArriveStation:false,
							isBeforeDepartStation:false,
							isAfterArriveStation:false
						})
						// 当index 大于 departIndex 并且小于 达到站点的时候,则为你乘坐当前车辆列车会经过的站点
					}else if((index > departIndex) && (index < arriveIndex)){
						Object.assign(station,{
							isDepartStation:false,
							isArriveStation:false,
							isBeforeDepartStation:false,
							isAfterArriveStation:false
						})
						// 当index === arriveIndex时,则当前站点为达到站点
					}else if(index === arriveIndex){
						Object.assign(station,{
							isDepartStation:false,
							isArriveStation:true,
							isBeforeDepartStation:false,
							isAfterArriveStation:false
						});
						// 当index 大于 arriveIndex时, 则为你下车之后列车会经过的站点
					}else if(index > arriveIndex){
						Object.assign(station,{
							isDepartStation:false,
							isArriveStation:false,
							isBeforeDepartStation:false,
							isAfterArriveStation:true
						})
					}
					Object.assign(station,{
						isStartStation: index === startIndex,
						isEndStation : index === endIndex
					})
				});
				this.setState({scheduleList});
			});
	}
	render(){
		const {scheduleVisible,toggleScheduleVisible} = this.props;
		return(
			<div
				className={['mask',!scheduleVisible ? 'hide':""].join(" ")}
				onClick={() => {toggleScheduleVisible()} }
			>
				<div className='schedule-wrapper'>
					<h3 className="title">列车时刻表</h3>
					<div className="head">
						<p className='station'>车站</p>
						<p className="arrive">到达</p>
						<p className="depart">发车</p>
						<p className="stay">停留</p>
					</div>
					<ul className="station-list">
						{this.state.scheduleList.length > 0 && this.state.scheduleList.map((schedule,index) =>{
							return (
								<ScheduleRow
									key={index}
									index={index+1}
									{...schedule}
								/>
							)
						})}
					</ul>
				</div>
			</div>
		)
	}
}
Schedule.propTypes = {
	trainDepart:PropTypes.string,
	trainArrive:PropTypes.string,
	scheduleVisible:PropTypes.bool
}
const mapStateToProps = state => {
	return {
		trainDepart:state.trainDepart,
		trainArrive:state.trainArrive,
		scheduleVisible:state.scheduleVisible
	}
}
export default connect(
	mapStateToProps,
	{toggleScheduleVisible}
)(Schedule);
