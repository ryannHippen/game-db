import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import GameDBGameByGenreSearchResults from "./GameDBGameByGenreSearchResults";
import GameDBSearch from "./GameDBSearch";
import GameDBGenre from "./GameDBGenre";



class GameDB extends Component {
    render() {
        return (
            <BrowserRouter>
                <> 
                    <Switch>
                        <Route path="/" exact component={GameDBSearch} />
                        <Route path="/games/genre/:id" exact component={GameDBGameByGenreSearchResults} />.
                        <Route path="/games/genre" exact component={GameDBGenre} />
                    </Switch>
                </>
            </BrowserRouter>
        )
    }
}


export default GameDB;
