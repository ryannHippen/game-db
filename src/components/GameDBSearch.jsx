import React, { Component } from "react";


class GameDBSearch extends Component {

    constructor(props) {
        super(props)
        this.state = {
            apiResultsGames: [],
            genreName: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.resultSearch = this.resultSearch.bind(this);
        this.genreInfo = this.genreInfo.bind(this);
    }

    componentDidMount() {
        
    }

    genreInfo(){
        this.props.history.push(`/games/genre` + this.state.genreName);
    }

    resultSearch() {
        this.props.history.push(`/games/` + this.state.genreName);
    }

    handleChange(value) {
        this.setState({genreName: value.target.value});
    }

    render() {
        return (
            <div>
                <input type="text" onBlur={this.handleChange}></input>
                <button onClick={this.resultSearch}>Search By Genre</button>
                <button onClick={this.genreInfo}>Genre Information</button>
            </div>
        )
    }
}



export default GameDBSearch;