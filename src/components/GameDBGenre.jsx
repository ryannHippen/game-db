import React, { Component } from "react";
import Api from "../service/Api"
import { Card, CardContent, CardMedia, Typography, Grid, Button, CardActions, CardActionArea } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';



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
        const useStyles = makeStyles({
            card: {
                maxWidth: 345,
                margin: 10
            },
            pos: {
                margin: 100,
              },  
        });
        return (
            <Box>
                <Grid container justify="center" > <h2 >Select Genre For More Information</h2></Grid>
                <Grid container justify="center" > 
                {this.state.apiResultsGenreInfo.map(genre =>
                    <Card container className={useStyles.card}>
                        <CardActionArea>
                            <CardMedia style={{ width: 300, height: 175, margin:8}}
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
                            <Button size="small" color="primary" onClick={() => { this.resultSearch(genre.id) }}>
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



export default GameDBGenre;