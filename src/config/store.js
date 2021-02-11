import { createStore, combineReducers } from 'redux';
import listReducer from '../components/reducer';

function saveToLocalStorage(state) {
    try{
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    }
    catch(err){
        console.log(err);
    }
}

function loadFromLocalStorage() {
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    }
    catch(err) {
        console.log(err);
        return undefined;
    }
}


const rootReducer = combineReducers({
    list: listReducer
})

let persistedState = loadFromLocalStorage();

const store = createStore(
    rootReducer,
    persistedState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

store.subscribe( () => saveToLocalStorage(store.getState()));


export default store;
