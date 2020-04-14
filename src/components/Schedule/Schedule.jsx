import React  from 'react';
import PropTypes from 'prop-types';
import './Schedule.scss';

class Schedule extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			isScheduleVisible:true
		}
	}
	showSchedule = () => {
		this.setState({
			isScheduleVisible:true
		})
	}
	hideSchedule = () => {
		this.setState({
			isScheduleVisible:false
		})
	}
	render(){
		return(
			<div
				className={['mask',!this.state.isScheduleVisible ? 'hide':""].join(" ")}
				onClick={() => {this.hideSchedule()}}
			>
				<div className='schedule-wrapper'>
					
				</div>
			</div>
		)
	}
}

export default Schedule;