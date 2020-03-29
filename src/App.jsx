import React from 'react';
import Home from './components/Home/Home';
import Query from './components/Query/Query';
import './App.scss';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';

function App(){
    return (
        <Router>
            <div className={'ticket-app'}>
                <Switch>
                    <Route path={'/'} exact>
                        <Home/>
                    </Route>
                    <Route path={'/query'}>
                        <Query/>
                    </Route>
                </Switch>
            </div>
        </Router>
    )
}

export default App;