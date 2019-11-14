import React, { Component } from "react";
import Api from "../service/Api"
import { Card, CardContent, CardMedia, Typography, Grid, Button, CardActions, CardActionArea } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import '../App.css';
import { connect } from 'react-redux';
import { addGameList } from '../actions/GameDBActions';

class GameDBGenre extends Component {

    constructor(props) {
        super(props)

        this.state = {
            apiResultsGenreNames: [],
            genreName: '',
            apiResultsGenreImage: [],
            apiResultIndex: [],
            apiResultsGenreInfo: [],
        }
    }

    componentDidMount() {

        this.getGenreInformation();
    }

    getGenreInformation() {
        Api.getRequest('genres').then((response) => {
            for (var i = 0; i < response.data.results.length; i++) {
                this.setState({
                    apiResultsGenreNames:
                        this.state.apiResultsGenreNames.concat(response.data.results[i].name),
                    apiResultsGenreImage:
                        this.state.apiResultsGenreImage.concat(response.data.results[i].image_background),
                    apiResultsGenreInfo: this.state.apiResultsGenreInfo.concat({
                        'name': response.data.results[i].name,
                        'image': response.data.results[i].image_background,
                        'id': response.data.results[i].id,
                    }),

                })
            };
        })
    }

    resultSearch(id) {
        this.props.history.push(`/games/genre/` + id);
    }



    render() {

        let item = this.state.apiResultsGenreNames;
        return (
            <Box className='box-padding box-default'>
                <Grid container justify="center" className="h2-label-font">
                    <h2>Select Genre For More Information</h2>
                </Grid>
                <Grid container justify="center" >
                    {this.state.apiResultsGenreInfo.map(genre =>
                        <Card container className='pos' >
                            <CardActionArea className='card-action-area'>
                                <CardMedia className='card-media-all-genre'
                                    image={genre.image}
                                    text
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {genre.name}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Button size="small" color="primary" onClick={() => { 
                                    this.resultSearch(genre.id); this.props.addGameList(item);}}>
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
        gamesList: state.apiResultsGenreNames
    };
}

function mapDispatchToProps(dispatch) {
    return {
        addGameList: item => dispatch(addGameList(item))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameDBGenre);