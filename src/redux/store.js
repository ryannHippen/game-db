import { createStore } from 'redux';
import rootReducer from "../reducers/rootReducer";
// import thunk from 'redux-thunk';
/**
 * When we call this function we return a created store with our reducers, so this is the same
 * as calling `const store = createStore(reducer)`. We have extracted it to a separate file. This function
 * gets called in 'index.js'. The second argument to 'createStore' is so we can use Redux DevTools
 * in our browser for easier debugging. Super cool!
 * @param {Object} initialState 
 */

 
 /*
export default function configureStore(initialState={}) {
    return createStore(
      rootReducer,
      initialState,
      applyMiddleware(thunk)
    );
   }
*/

export default function store() {
    return createStore(
      rootReducer,
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
}

//The last argument is just so you can use the Redux DevTools for Chrome/Firefox, download
//the extension to your browser and see what happens. 
//Chrome:
//https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd
//FireFox:
//https://addons.mozilla.org/en-US/firefox/addon/remotedev/