import {connect} from 'react-redux';
import './App.scss';
import React from 'react';

function App(props){
    return (
        <div>
            <p>Index</p>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {state};
}
const mapDispatchToProps = {}

export default connect(mapStateToProps,mapDispatchToProps)(App)
