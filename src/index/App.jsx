import React from 'react';
import Header from '../components/Header/Header'
import Journey from '../components/Journey/Journey'
import CitySelector from '../components/CitySelector/CitySelector'
import DepartDate from '../components/DepartDate/DepartDate';
import DateSelector from '../components/DateSelector/DateSelector';
import './App.scss';

function App(){
    return (
        <div className={'ticket-app'}>
            <Header
                title={"火车票"}
                show={false}
            />
            <div className="top-bg">
                <img
                    src={require('../common/imgs/banner.jpg')}
                    alt="bg"
                />
            </div>
            <div className="journey-card">
                <Journey/>
                <DepartDate/>
            </div>
            <CitySelector/>
            <DateSelector/>
        </div>
    )
}

export default App;