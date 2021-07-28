import { Button, Paper, TextField, Typography } from '@material-ui/core';
import React,{useState,useEffect} from 'react'
import useStyles from './FormStyle';
import { useDispatch,useSelector } from 'react-redux';
import {useHistory} from 'react-router-dom'
import { createPost,updatePost } from '../../actions/posts';
// import FileBase from 'react-file-base64'; ---> wants some babel compilation ---> weird :(

function Form({currentId,setCurrentId}) {
  const classes = useStyles();
  const history = useHistory();
    const dispatch = useDispatch();
    const user=JSON.parse(localStorage.getItem('profile'))
  //takes the post that has the currentId thats passed to this Form() equal to it
    const post = useSelector(state => currentId ? state.posts.posts.find(p => p._id === currentId) : null);
  

    const [postData, setPostData] = useState({
        // creator: '',
        title: '',
        desc: '',
        tags: '',
        selectedFile: '',
        refLink: ''
    });
  
    useEffect(() => {
      if (post) {
        setPostData(post);
      }
    }, [post]);

    const handleSubmit =  (e) => {
        e.preventDefault();

        if (currentId) {
            dispatch(updatePost(currentId, {...postData,name:user?.result?.name})); // Whatever is there in the form would be the updated post data 
            handleClear()
        } else {
          dispatch(createPost({ ...postData, name: user?.result?.name },history));
          handleClear()
        }
        
        //dispatch the created actions so that reducers verify and act accordingly
        handleClear();
    }

  const handleClear = () => {
    setCurrentId(null);
      setPostData({
        // creator: '',
        title: '',
        desc: '',
        tags: '',
        selectedFile: '',
        refLink: ''
      })
    }
    const uploadImage = async (e) => {
      const base64 = await convertBase64(e.target.files[0]);
      // console.log(base64);
      setPostData({ ...postData, selectedFile: base64 });
    }
    const convertBase64 = async (file) => {
      return new Promise((resolve,reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
          resolve(fileReader.result)
        }
        fileReader.onerror = (error) => {
          reject(error)
        }
      })
    }
  if (!user) {
    return <Paper className={classes.paper}>
      <Typography variant="h6" align="center">Please Sign In To create your posts and like others work</Typography>
    </Paper>
  }
    return (
      <Paper className = {classes.paper} elevation={6}> 
        <form autoComplete="off" className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
          <Typography variant="h6"> {currentId ? 'Edit' : 'Create'} a BlogPost</Typography>
          {/* <TextField name="creator" variant="outlined" label="Creator" fullWidth value={postData.creator} */}
            {/* //All data will persist except what is getting overwritten */}
            {/* onChange= {e => setPostData({...postData ,creator: e.target.value})} */}
          {/* /> */}
          <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title}
            onChange= {e => setPostData({...postData ,title: e.target.value})}
          />
          <TextField name="desc" variant="outlined" label="description" fullWidth value={postData.desc}
            onChange= {e => setPostData({...postData ,desc: e.target.value})}
          />
          <TextField name="tags" variant="outlined" label="Tags" fullWidth value={postData.tags}
            onChange= {e => setPostData({...postData ,tags: e.target.value.split(',')})}
          />
          <TextField name="refLink" variant="outlined" label="refLink" fullWidth value={postData.refLink}
            onChange= {e => setPostData({...postData ,refLink: e.target.value})}
          />
          <div className={classes.fileInput}>
            <input type="file" onChange={e => uploadImage(e)} />
          </div>
         <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
          <Button variant="contained" color="secondary" size="large" onClick={handleClear} fullWidth>Clear</Button>
        </form>
      </Paper>
    )
}

export default Form
