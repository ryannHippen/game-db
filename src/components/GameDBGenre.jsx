import React, { Component } from "react";
import Api from "../service/Api"
import { Card, CardContent, CardMedia, Typography, Grid, Button, CardActions, CardActionArea } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import '../App.css';
import { connect } from 'react-redux';
import { addGameList, addGenreInfo, addGenreInfoAndGameList } from '../actions/GameDBActions';

class GameDBGenre extends Component {

    constructor(props) {
        super(props)

        this.state = {
            apiResultIndex: [],
            apiResultsGenreInfo: [],
            genreGameList: [],
            gameDetailedInfo: [],
        }
    }

    componentDidMount() {
        this.getGenreInformation();
    }

    getGenreInformation() {
        if (this.props.genreInfo === undefined) {
            Api.getRequest('genres').then((response) => {
                for (var i = 0; i < response.data.results.length; i++) {
                    this.setState({
                        genreGameList: this.state.genreGameList.concat({
                            'genre': response.data.results[i].name,
                            'games': response.data.results[i].games,
                        }),
                        apiResultsGenreInfo: this.state.apiResultsGenreInfo.concat({
                            'name': response.data.results[i].name,
                            'image': response.data.results[i].image_background,
                            'id': response.data.results[i].id,
                        })
                    })
                }
            })

        } else {
            console.log(this.props.gamesList)
            this.setState({ 
                apiResultsGenreInfo: this.props.genreInfo,
                genreGameList: this.props.gamesList
            })
        }
    }


    resultSearch(gameId) {
        let selectedGenreGamesList = [];
        for (let i = 0; i < this.state.apiResultsGenreInfo.length; i++) {
            if (this.state.apiResultsGenreInfo[i].id === gameId) {
                
                for (let j = 0; j < this.state.genreGameList[i].games.length; j++) {
                    Api.getRequest('games/' + this.state.genreGameList[i].games[j].id).then((response) => {
                        selectedGenreGamesList = selectedGenreGamesList.concat([{
                            'id': response.data.id,
                            'name': response.data.name,
                            'description': response.data.description_raw,
                            'image': response.data.background_image_additional,
                            'metacritic' : response.data.metacritic,
                            'released' : response.data.released,
                            'website' : response.data.website,
                            'reddit_url' : response.data.reddit_url,
                        }])
                        if (selectedGenreGamesList.length === 6) {
                            this.props.addGenreInfoAndGameList(
                                this.state.apiResultsGenreInfo, this.state.genreGameList, selectedGenreGamesList)
                        }
                    })
                }
                this.props.history.push(`/games/genre/` + gameId);
                break;
            }
        }
    }


    render() {
        return (
            <Box className='box-padding box-default'>
                <Grid container justify="center" className="h2-label-font">
                    <h2>Select Genre For More Information</h2>
                </Grid>
                <Grid container  justify="center" >
                    {this.state.apiResultsGenreInfo.map(genre =>
                        <Card container  className='pos' key={genre.id}>
                            <CardActionArea className='card-action-area'>
                                <CardMedia className='card-media-all-genre'
                                    image={genre.image}
                                    
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {genre.name}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Button size="small" color="primary" onClick={() => this.resultSearch(genre.id)}>
                                    More Info
                                </Button>
                            </CardActions>
                        </Card>
                    )}
                </Grid>
            </Box>
        )
    }
}

function mapStateToProps(state, props) {
    return {
        gamesList: state.gameListReducer.gamesList[0],
        genreInfo: state.gameListReducer.genreInfo[0],
        genreGamesList: state.gameListReducer.genreGameExamples[0],
    };
}

function mapDispatchToProps(dispatch) {
    return {
        addGameList: item => dispatch(addGameList(item)),
        addGenreInfo: genre => dispatch(addGenreInfo(genre)),
        addGenreInfoAndGameList: (genre, item, genreGames) => dispatch(addGenreInfoAndGameList(genre, item, genreGames)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameDBGenre);