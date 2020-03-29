import React from 'react';
import Header from '../Header/Header'
import Journey from '../Journey/Journey'
import CitySelector from '../CitySelector/CitySelector'
import DepartDate from '../DepartDate/DepartDate';
import DateSelector from '../DateSelector/DateSelector';
import HighSpeed from '../HighSpeed/HighSpeed.jsx';
import './Home.scss';
import {NavLink} from 'react-router-dom';

function Home(){
    return (
        <div className={'ticket-app'}>
            <Header
                title={"火车票"}
                show={false}
            />
            <div className="top-bg">
                <img
                    src={require('../../common/imgs/banner.jpg')}
                    alt="bg"
                />
            </div>
            <div className="journey-card">
                <Journey/>
                <DepartDate/>
                <HighSpeed/>
                <NavLink to={'/query'}>
                    <input
                        className={'query-button'}
                        type="submit"
                        value={"查询车票"}
                    />
                </NavLink>
            </div>
            <CitySelector/>
            <DateSelector/>
        </div>
    )
}

export default Home;