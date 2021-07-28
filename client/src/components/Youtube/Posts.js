import { FormControl, InputBase, InputLabel, makeStyles, MenuItem, Paper, Select,Grid, withStyles } from '@material-ui/core'
import React, { useEffect, useState } from 'react';
import CardYT from './card/CardYT';
import axios from 'axios';
import { } from 'moment';


function Posts() {
    const [domain, setDomain] = useState('');
    const [posts, setPosts] = useState([]);
    const handleChange = async (event) => {
        setDomain(event.target.value);
        const domainName = event.target.value;
        const result = await axios.get(`http://localhost:5000/channel?domainName=${domainName}`);
        setPosts(result.data);
        // console.log(typeof(result.data));
    };
  
    return (
        <Paper style={{padding : '10px'}}>
            <FormControl fullWidth style={{marginBottom : '20px'}} >
                <InputLabel>Select Domain</InputLabel>
                <Select
                    labelId="Select a Domain"
                    id=""
                    value={domain}
                    onChange={handleChange}
                >
                <MenuItem value="web development">Web Development</MenuItem>
                <MenuItem value="data structures">Data Structures</MenuItem>
                <MenuItem value="app development">App Development</MenuItem>
                <MenuItem value="machine learning">Machine Learning</MenuItem>
                <MenuItem value="cloud computing">Cloud Computing</MenuItem>
                <MenuItem value="learn java">Learn Java</MenuItem>
                <MenuItem value="learn c++">Learn C++</MenuItem>
                <MenuItem value="learn python">Learn Python</MenuItem>
                <MenuItem value="learn javascript">Learn Javascript</MenuItem>
                <MenuItem value="learn c#">Learn C#</MenuItem>
                <MenuItem value="learn c">Learn C</MenuItem>
                </Select>
            </FormControl>
            <div>
                {posts.length > 0 && (
                    <Grid container alignItems="stretch" spacing={3}>
                    {
                        posts.map(post => (<Grid item xs={12} sm={12} md={6} lg={4} key={post._id}> <CardYT post={post}/> </Grid>)  )
                    }
                    </Grid>
                )}
            </div>
      </Paper>
    )
}

export default Posts
