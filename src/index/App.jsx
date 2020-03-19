import React,{useCallback} from 'react';
import Header from '../components/Header/Header'
import Journey from '../components/Journey/Journey'
import CitySelector from '../components/CitySelector/CitySelector'
import DepartDate from '../components/DepartDate/DepartDate';
import './App.scss';
function App(){
    const onBack = useCallback(() => {
        window.history.back();
    },[]);
    return (
        <div className={'ticket-app'}>
            <Header
                title={"火车票"}
                onBack={onBack}
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
        </div>
    )
}

export default App;