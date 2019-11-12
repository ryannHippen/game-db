import React, { Component } from "react";
import Api from "../service/Api"
import { Card, CardContent, CardMedia, Typography, Grid, Button, CardActions, CardActionArea, Collapse, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


class GameDBGameByGenreSearchResults extends Component {

    constructor(props) {
        super(props)
        this.state = {
            genreInfo: [],
            genreId: this.props.match.params.id,
            expanded: false,
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
            this.setState({
                genreInfo: response.data,
                genreName: response.data.name,
            })
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
            <div style={{ width: '75%', margin: '0 auto' }}>
                <Grid container justify="center" > <h2 >Genre Details</h2></Grid>
                <Grid container>
                    <Card  >
                        <CardActionArea>
                            <CardMedia style={{ width: 1050, height: 400 }}
                                image={this.state.genreInfo.image_background}
                            />
                            <CardContent >
                                <Typography gutterBottom variant="h5" component="h2">
                                    {this.state.genreInfo.name}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {this.state.genreInfo.description}
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



                        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                            <CardContent>
                                <Typography paragraph>

                                </Typography>
                            </CardContent>
                        </Collapse>
                    </Card>
                </Grid>
            </div >
        )
    }
}



export default GameDBGameByGenreSearchResults;