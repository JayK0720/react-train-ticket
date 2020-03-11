import React,{useCallback} from 'react';
import Header from '../components/Header/Header'
import Journey from '../components/Journey/Journey'
import CitySelector from '../components/CitySelector/CitySelector'

function App(props){
    const onBack = useCallback(() => {
        window.history.back();
    },[]);
    return (
        <div>
            <Header
                title={"火车票"}
                onBack={onBack}
            />
            <Journey/>
            <CitySelector/>
        </div>
    )
}

export default App;