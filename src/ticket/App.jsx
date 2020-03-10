import {connect} from 'react-redux';
import React from 'react'
import './App.scss';
function App(){
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
