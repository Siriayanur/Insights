import React, { useEffect } from 'react'
import SinglePost from './Post/SinglePost'
import useStyles from './PostStyle'
import { useSelector } from 'react-redux';
import { CircularProgress, Grid, Paper, Typography } from '@material-ui/core';
//useSelector --> extract data from redux store

function Posts({setCurrentId}) {
    const {posts,isLoading} = useSelector((state) => (state.posts)) //amongst the many properties in the state, extract only the posts
    const classes = useStyles();
    if (!isLoading && !posts.length) {
        return <Paper elevation={6} className={classes.paper}>
            <Typography className="text"  gutterBottom  variant="h4">Sign in and create a post🔥</Typography>
        </Paper>;
   }
    return (
        <>
            {isLoading ? <CircularProgress /> : (
                <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                    {
                        posts.map(post => (<Grid item xs={12} sm={12} md={6} lg={3} key={post._id}> <SinglePost setCurrentId={setCurrentId} post={post}/> </Grid>)  )
                    }
                </Grid>
            )}
        </>
    )
    
}

export default Posts
