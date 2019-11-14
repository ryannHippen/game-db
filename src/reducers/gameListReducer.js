import initialState from './initialState';

/**
 * This is so we could extend the product array of the state,
 * this reducer takes the products array from 'initialState.js'
 * and returns it, nothing more. Not listening to any actions
 * at the moment. This will populate the state
 */
export default function games(state = initialState.gamesList, action){
     switch (action.type) {
          case 'ADD':
              //If 'ADD' from 'cartActions.js', spread the previous state, and
              //add the new item. This will result in a new array with an added item
              return [...state, action.list];
          case 'REMOVE':
              //If 'REMOVE' from 'cartActions.js', return a new array without the
              //item with the ID we clicked on. filter returns a new array, don't
              //have to spread here
              return state.filter( i => i.id !== action.item.id);
          default:
              return state;
      }
};