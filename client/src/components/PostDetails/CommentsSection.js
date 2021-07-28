import React,{useState,useRef} from 'react'
import { Typography, Button, TextField } from '@material-ui/core'
import {useDispatch} from 'react-redux'
import useStyles from './style'
import { commentPost } from '../../actions/posts';
function CommentsSection({post}) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));
    const [comments, setComments] = useState(post?.comments);
    const [comment, setComment] = useState('')
    const commentEndRef = useRef();
    //Your post is wonderful
    const handleClick = async () => {
        const finalComment = `${user.result.name}: ${comment}`;
        const newComments = await dispatch(commentPost(finalComment, post._id));
        setComments(newComments);
        setComment('');

        //scroll to the commentEndRef as it is just below the end of comments for that post
        commentEndRef.current.scrollIntoView({behavior : 'smooth'})
    }
    return (
        <div>
            <div className={classes.commentsOuterContainer}>
                <div className={classes.commentsInnerContainer}>
                    <Typography gutterBottom variant="h6">Comments</Typography>
                    {comments.map((c, i) => (
                        <Typography key={i} gutterBottom variant="subtitle1">
                            <strong>{c.split(': ')[0]}</strong>: 
                            {c.split(':')[1]}
                        </Typography>
                    ))}
                    <div ref={commentEndRef }/>
                 </div>
                {user?.result?.name && (
                    <div style={{ width : '70%'}}>
                        <Typography gutterBottom variant="h6">
                            Write a comment
                        </Typography>
                        <TextField
                            fullWidth
                            rows={4}
                            label="Comment"
                            multiline
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                        <Button style={{ marginTop: '10px',backgroundColor: '#DBE6FD' }} disabled={!comment} variant="contained" fullWidth onClick={handleClick}>
                            Comment
                        </Button>
                    </div>
                )}
                
            </div>
        </div>
    )
}

export default CommentsSection
