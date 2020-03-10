import React,{useCallback} from 'react';
import {connect} from 'react-redux';
import {exchangeFromTo} from './actions'
import Header from '../components/Header/Header'
import Journey from '../components/Journey/Journey'
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
        </div>
    )
}

export default App;