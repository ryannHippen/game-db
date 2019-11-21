import React, { Component } from "react";
import {
    Card, CardContent, CardMedia, Typography, Grid,
    Button, CardActions, CardActionArea, Collapse,
    IconButton
} from '@material-ui/core';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Box from '@material-ui/core/Box';
import { connect } from 'react-redux';

class GameDBGameInfo extends Component {

    constructor(props) {
        super(props)
        this.state = {
            genreInfo: [],
            gameName: this.props.match.params.game,
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
        this.props.history.push(`/games/genre/${this.props.genre.id}`);
    }

    componentDidMount() {

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
                                image={this.props.game.image}
                                alt-prop=""
                            />
                            <CardContent >
                                <Typography gutterBottom variant="h5" component="h2">
                                    {this.props.game.name}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {this.props.game.description}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button size="small" color="primary" onClick={() => {
                                this.goBack()
                            }}>
                                Back To Genre
                                    </Button>
                            <IconButton
                                onClick={this.changeExpansion}
                                aria-label="show more">
                                <ExpandMoreIcon />
                            </IconButton>
                        </CardActions>
                        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit >
                            <ul>
                                <li><a href={this.props.game.website} target="_blank" rel="noopener noreferrer" >Click for Games Website</a></li>
                                <li>{this.props.game.metacritic}</li>
                                <li>{this.props.game.released}</li>
                            </ul>
                        </Collapse>
                    </Card>
                </Grid>
            </Box>
        )
    }
}

function mapStateToProps(state, props) {
    return {
        game: state.gameListReducer.currentGameInfo[0],
        genre: state.gameListReducer.currentGenreSelected[0],
    };
}

export default connect(mapStateToProps)(GameDBGameInfo);