import { AppBar, Button, Container, Grid, Grow, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import Posts from './Posts';
import useStyles from './style';

function Youtube() {
    const classes = useStyles();
  return (
      <div>
        <Grow in>
          <Container maxWidth="xl">
            <Grid className={classes.gridContainer} container justify="space-between" alignItems="stretch" spacing={3}>
                {/* Youtube contents */} 
                <Grid item xs={12} sm={6} md={9}>
                  <Posts/>
                </Grid>
                {/* <Grid item xs={12} sm={6} md={3}>
                    <AppBar className={classes.appBarSearch} position="static" color="inherit">
                        <TextField
                          style={{marginBottom : '20px'}}
                            name="search"
                            variant="outlined"
                            label="Search Tutorials"
                            fullWidth
                            // onKeyPress={handleKeyPress}
                            value=" "
                            // onChange={(e) =>setSearchPost(e.target.value)}
                        />
                        <Button  className={classes.searchButton} variant="contained" color="secondary" >
                            Search
                        </Button>
                    </AppBar>
                    </Grid> */}
                </Grid>
            </Container>
          </Grow>
        </div>
    )
}

export default Youtube
