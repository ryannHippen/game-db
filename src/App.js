import React from 'react';
import './App.css';
import GameDB from './components/GameDB';
import { Grid } from '@material-ui/core';


function App() {
  return (
    <div>
      <Grid container justify="center">
        <GameDB />
      </Grid>
    </div>
  );
}

export default App;