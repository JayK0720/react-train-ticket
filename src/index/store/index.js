import {createStore,combineReducers,compose,applyMiddleware} from 'redux';
import thunk from 'redux-thunk'
import logger from 'redux-logger';
import {
    from,
    to,
    citySelector
}
from '../reducer/index.js'

const store =  createStore(
    combineReducers({
        from,
        to,
        citySelectorVisible:citySelector
    }),
    compose(
        applyMiddleware(
            thunk,
            logger
        ),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
)
export default store;