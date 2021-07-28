import { Button, Paper, TextField,Grid,Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import RepoCard from './RepoCard';
import useStyles from './style';
import axios from 'axios';

function Repo() {
    const classes = useStyles();
    const [repositories, setRepositories] = useState([]);
    const [searchTech, setSearchTech] = useState('');
  
  useEffect(() => {
      async function fetchRepos() {
            try {
                const result = await axios.get('http://localhost:5000/repos');
                let repoResult = [];
                for (const repo of result.data) {
                    repoResult.push(repo);
                }
                setRepositories(repoResult);
            } catch (e) {
                console.log(e);
            }
        }
      fetchRepos();
    }, [])
  
    const handleSubmit = async(e) => {
      e.preventDefault();
      const result = await axios.get(`http://localhost:5000/repos/?tech=${searchTech}`)
      setRepositories(result.data);
      console.log('Printing this');
    }
    const handleClear = () => {
      setSearchTech('');
    }

    return (
        <Paper className = {classes.paper} elevation={6}> 
        <form autoComplete="off" className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
          
          <TextField name="title" variant="outlined" label="Search for Technologies..." fullWidth value={searchTech}
            onChange= {e => setSearchTech(e.target.value)}
          />
          
          <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
          <Button variant="contained" color="secondary" size="large" onClick={handleClear} fullWidth style={{marginBottom : '20px'}}>Clear</Button>
        </form>
        <Grid container spacing={2} >
            {
              repositories.length !== 0 ?
                (repositories.map((post,i) =>
                  <Grid key={i} item xs={12} sm={4}>
                    <RepoCard post={post} />
                  </Grid>
                )):
              (<Paper elevation={6} className={classes.paper}>
                  <Typography className="text"  gutterBottom  variant="h4">No Repos yet🚀</Typography>
              </Paper>)
            }
        </Grid>
      </Paper>
    )
}

export default Repo;
