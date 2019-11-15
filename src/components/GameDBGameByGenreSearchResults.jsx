import React, { Component } from "react";
import Api from "../service/Api"
import { Card, CardContent, CardMedia, Typography, Grid, Button, CardActions, CardActionArea, Collapse, IconButton } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Box from '@material-ui/core/Box';
import GameDBGenre from './GameDBGenre'
import { connect } from 'react-redux';
import configureStore from "../redux/store";

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
        Api.getRequest('genres/' + this.state.genreId).then((response) => {
            for (var i = 0; i < this.props.list.length; i++) {
                if(this.props.list[i].genre===response.data.name){
                    this.setState({index: i,
                    genreInfo: response.data,
                    genreName: response.data.name,
                    genreDescription: response.data.description.replace(/<\/?[^>]+(>|$)/g, "").replace(/&#39;/g, "'"),
                })
                break;}
            }
        })
            .catch((error) => {
                console.log(error)
            })
    }

    changeExpansion() {
        if (this.state.expanded === false) {
            this.setState({ expanded: true });
        } else {
            this.setState({ expanded: false })
        }
    }

    render() {

        return (
            <Box className='box-default box-padding'>
                <Grid container className="margin-auto box-padding">
                    <Card className=" card-padding card-margin" >
                        <CardActionArea >
                            <CardMedia className="card-media-single-genre"
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
                            <Button size="small" color="primary" onClick={() => { this.goBack() }}>
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
                            <CardContent >
                                <Typography > Examples of the Genre:</Typography>
                                {this.props.list[this.state.index].games.map(game =>
                                    <Typography paragraph>
                                        <ul>
                                            <li>{game.name}</li>
                                        </ul>
                                    </Typography>
                                )}
                            </CardContent>
                        </Collapse>
                    </Card>
                </Grid>
            </Box>
        )
    }
}

function mapStateToProps(state, props) {
    return {
        list: state.gameListReducer[0]
    };
}

export default connect(mapStateToProps)(GameDBGameByGenreSearchResults);