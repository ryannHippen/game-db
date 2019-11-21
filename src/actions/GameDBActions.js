/**
 * We don't have to use the variable 'payload', we can also just name it: 'item'
 * @param {Object} list 
 */
export function addGameList(list) {
    return {
        type: 'ADD_GAMELIST',
        list
    }
}

export function addGenreInfoAndGameList(genre, list, genreGames) {
    return {
        type: 'ADD_GENRE_GAME',
        genre,
        list,
        genreGames
    }
}

export function addSelectedGameInfo(game, genreSelected) {
    return {
        type: 'ADD_SELECTED_GAME',
        game,
        genreSelected
    }
}

export function addSelectedGenreInfo(genreSelected) {
    return {
        type: 'ADD_SELECTED_GENRE',
        genreSelected
    }
}

export function addGenreInfo(genre) {
    return {
        type: 'ADD_GENRE_INFO',
        genre
    }
}