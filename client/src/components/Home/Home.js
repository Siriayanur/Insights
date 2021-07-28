import React,{useState} from 'react'
import { useDispatch } from 'react-redux';
import { Grid, Container, Grow, Paper, AppBar, TextField, Button } from '@material-ui/core';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import Paginate from '../Pagination';
import useStyles from './style';
import {fetchPostsBySearch } from '../../actions/posts';
import { useHistory, useLocation } from 'react-router';
import ChipInput from 'material-ui-chip-input';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function Home() {
    const [currentId, setCurrentId] = useState(null);
    const [searchPost, setSearchPost] = useState('');
    const [tags, setTags] = useState([]);
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const query = useQuery()
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery')

    const handleKeyPress = (e) => {
        if (e.keyCode === 13) {
            //Enter key it is
            //Search for post
            handleSearch();
            clear();
        }
    }
    //TAG Functions  
    const handleAdd = (tagToAdd) => setTags([...tags, tagToAdd]);
    const handleDelete = (tagToDelete) => setTags(tags.filter(tag => tag !== tagToDelete));

    //clear the bars
    const clear = () => {
        setSearchPost('');
        setTags([]);
    }
    //SEARCH 
    const handleSearch = () => {
        if (searchPost.trim() || tags) {
            //dispatch to fetch the targeted post
            dispatch(fetchPostsBySearch({ search: searchPost, tags: tags.join(',') }))
            
            //after dispatching move to a particular url:
            history.push(`/posts/search?searchQuery=${searchPost || 'none'}&tags=${tags.join(',')}`)
            clear();
        } else {
            history.push('/');
        }
    }

    // useEffect(() => {
    //     dispatch(getPosts());
    // }, [dispatch, currentId]);

    return (
        <div>
            <Grow in>
                    <Container maxWidth="xl">
                        <Grid className={classes.gridContainer} container justify="space-between" alignItems="stretch" spacing={3}>
                            <Grid item xs={12} sm={6} md={9}>
                                <Posts setCurrentId={setCurrentId}/>
                            </Grid>
                         
                        <Grid item xs={12} sm={6} md={3}>
                            <AppBar className={classes.appBarSearch} position="static" color="inherit">
                                <TextField
                                    name="search"
                                    variant="outlined"
                                    label="Search Posts"
                                    fullWidth
                                    onKeyPress={handleKeyPress}
                                    value={searchPost}
                                    onChange={(e) =>setSearchPost(e.target.value)}
                                />
                                <ChipInput
                                    style={{ margin: '10px 0' }}
                                    value={tags}
                                    onAdd={ handleAdd}
                                    onDelete={ handleDelete}
                                    label="Search tags"
                                    variant="outlined"
                                />
                                <Button onClick={handleSearch} className={classes.searchButton} variant="contained" color="secondary" >
                                    Search
                                </Button>
                            </AppBar>
                            <Form currentId={currentId} setCurrentId={setCurrentId} />
                            {!searchQuery && !tags.length && (
                                <Paper className={classes.pagination} elevation = {6} >
                                    <Paginate page={page} />
                                </Paper>
                            )}
                            </Grid>
                        </Grid>
                    </Container>
                </Grow>
        </div>
    )
}

export default Home
