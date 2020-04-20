import React,{memo} from 'react'
import './Candidate.scss';
import PropTypes from 'prop-types';

const Channel = memo(function(props){
    console.log(props);
    const {name,desc} = props;
    return (
        <section className={'channel-card'}>
            <div className="order">
                <p className="name">{name}</p>
                <p className="desc">{desc}</p>
            </div>
            <div className="order-button">
                买票
            </div>
        </section>
    )
})


const Ticket = memo(function (props){
    const {type,priceMsg,ticketsLeft,channels} = props;
    return (
        <li className={'ticket'}>
            <div className="bar">
                <div className="left">
                    <span className="ticket-type">{type}</span>
                    <span className="ticket-price">
                        <i>¥</i>
                        {priceMsg}
                    </span>
                </div>
                <div className="right">
                    <span className="ticket-count">{ticketsLeft}</span>
                    <span className="button">收起</span>
                </div>
            </div>
            <div
                className="channel-wrapper"
                style={{height:'128px'}}
            >
                {channels.map((channel,index) => {
                    return (<Channel key={index} {...channel}/>)
                })}
            </div>
        </li>
    )
});
Ticket.propTypes = {
    type:PropTypes.string.isRequired,
    priceMsg:PropTypes.string.isRequired,
    ticketsLeft:PropTypes.string.isRequired,
    channels:PropTypes.array.isRequired
}

const Candidate = memo(function (props){
    const {candidates} = props;
    return (
        <div className={'candidate-wrapper'}>
            <ul className="candidate-list">
                {candidates.length > 0 && candidates.map((candidate,index) => {
                    return <Ticket key={index} {...candidate}/>
                })}
            </ul>
        </div>
    )
});
Candidate.propTypes = {
    candidates:PropTypes.array.isRequired
}

export default Candidate;