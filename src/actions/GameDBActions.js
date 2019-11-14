/**
 * We don't have to use the variable 'payload', we can also just name it: 'item'
 * @param {Object} list 
 */
    export function addGameList(list){
    return {
        type: 'ADD',
        list
    }
}