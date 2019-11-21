import initialState from './initialState';

export default function games(state = initialState, action) {

    switch (action.type) {

        case 'ADD_GAMELIST':
            return {
            ...state, gamesList:[action.list]
            }

        case 'ADD_SELECTED_GAME':
            return {
                ...state, 
                    currentGameInfo:[action.game],
                    currentGenreSelected: [action.genreSelected]
            }

        case 'ADD_SELECTED_GENRE':
            return {
                ...state, currentGenreSelected: [action.genreSelected]
            }

        case 'ADD_GENRE_INFO':
            return {
                ...state, genreInfo: [action.genre]
            }

        case 'ADD_GENRE_GAME':
            return {
                ...state, 
                    genreInfo:[action.genre],
                    gamesList:[action.list], 
                    genreGameExamples:[action.genreGames]
            }

        case 'REMOVE':
            return state.filter(i => i.id !== action.item.id);

        default:
            return state;
    }
};