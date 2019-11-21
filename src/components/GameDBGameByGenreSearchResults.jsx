import React, { Component } from "react";
import Api from "../service/Api"
import {
    Card, CardContent, CardMedia, Typography, Grid,
    Button, CardActions, CardActionArea, Collapse,
    IconButton, GridList, GridListTile, ListSubheader, GridListTileBar
} from '@material-ui/core';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Box from '@material-ui/core/Box';
import { connect } from 'react-redux';
import { addSelectedGameInfo } from '../actions/GameDBActions';

class GameDBGameByGenreSearchResults extends Component {

    constructor(props) {
        super(props)
        this.state = {
            genreInfo: [],
            genreId: this.props.match.params.id,
            genreDescription: '',
            expanded: false,
            index: 0,
            genreName: '',
            games: [{ 'name': '' }],
        }
        this.goBack = this.goBack.bind(this);
        this.changeExpansion = this.changeExpansion.bind(this);
    }

    goBack() {
        this.props.history.push(`/games/genre`);
    }

    componentDidMount() {
        this.loadGamesByGenre();
    }

    loadGamesByGenre() {
        if(this.props.currentGenreSelected !== undefined && this.props.currentGenreSelected.id.toString() === this.state.genreId) {
            this.setState({
                genreInfo: this.props.currentGenreSelected,
                genreName: this.props.currentGenreSelected.name,
                genreDescription: this.props.currentGenreSelected.description.replace(/<\/?[^>]+(>|$)/g, "").replace(/&#39;/g, "'"),
            })
        } else {
            Api.getRequest('genres/' + this.state.genreId).then((response) => {
                for (let i = 0; i < this.props.list.length; i++) {
                    if (this.props.info[i].name === response.data.name) {
                        this.setState({
                            index: i,
                            genreInfo: response.data,
                            genreName: response.data.name,
                            genreDescription: response.data.description.replace(/<\/?[^>]+(>|$)/g, "").replace(/&#39;/g, "'"),
    
                        })
                        break;
                    }
                }
            })
                .catch((error) => {
                    console.log(error)
                })
        }
    }

    changeExpansion() {
        if (this.state.expanded === false) {
            this.setState({ expanded: true, games: this.props.genreGames });
        } else {
            this.setState({ expanded: false })
        }
    }

    goToGamePage(game) {
        this.props.addSelectedGameInfo(game,this.state.genreInfo);
        this.props.history.push(`/games/info/${game.name}`);
    }

    render() {

        return (
            <Box className='box-default box-padding'>
                <Grid  className="margin-auto box-padding">
                    <Card className=" card-padding card-margin" >
                        <CardActionArea >
                            <CardMedia className="card-media-single-genre"
                                alt="Genre Example Image"
                                image={this.state.genreInfo.image_background}
                            />
                            <CardContent >
                                <Typography gutterBottom variant="h5" component="h2">
                                    {this.state.genreInfo.name}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {this.state.genreDescription}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button size="small" color="primary" onClick={() => {
                                this.goBack()
                            }}>
                                Go Back
                            </Button>
                            <IconButton
                                onClick={this.changeExpansion}
                                aria-label="show more"
                            >
                                <ExpandMoreIcon />
                            </IconButton>
                        </CardActions>
                        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit >
                                <ListSubheader component="div">Examples of the Genre:</ListSubheader>
                                <GridList cellHeight={180} rows={3} disabled={this.state.genreInfo.image_background !== ''}>
                                    {this.state.games.map(game =>
                                        <GridListTile key ={game.id} onClick= {() => {
                                            this.goToGamePage(game);
                                        }}>
                                            <img src={game.image} alt="" />
                                            <GridListTileBar
                                                title={game.name}
                                            />
                                        </GridListTile>
                                    )}
                                </GridList>
                        </Collapse>
                    </Card>
                </Grid>
            </Box>
        )
    }
}

function mapStateToProps(state, props) {

    return {
        list: state.gameListReducer.gamesList[0],
        info: state.gameListReducer.genreInfo[0],
        genreGames: state.gameListReducer.genreGameExamples[0],
        currentGenreSelected: state.gameListReducer.currentGenreSelected[0]
    };
}

function mapDispatchToProps(dispatch) {
    return {
        addSelectedGameInfo: (item,genre) => dispatch(addSelectedGameInfo(item,genre)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameDBGameByGenreSearchResults);