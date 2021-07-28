import React from 'react'
import moment from 'moment';
import useStyles from './SinglePostStyle';
import { MoreHoriz, ThumbUpAlt, Delete, ThumbUpAltOutlined } from '@material-ui/icons';
import { Button, Card, CardActions, CardContent, CardMedia, Typography, ButtonBase } from '@material-ui/core';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';

//We need to dispatch the delete post action from here
import { useDispatch } from 'react-redux';
import { deletePost, likePost } from '../../../actions/posts';
import {Link, useHistory} from 'react-router-dom'
function SinglePost({ post, setCurrentId }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const user = JSON.parse(localStorage.getItem('profile'))

    //Logic to render the likes
    const Likes = () => {
        if (post.likes.length > 0) {
            return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
                ? (
                    <><ThumbUpAlt fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}`}</>
                ) : (
                    <><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
                );
        }

        return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
    };

    const openPost = () => {
        history.push(`/posts/${post._id}`)
    }

    return (
        <Card className={classes.card} elevation={6}>
            
                <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
                <div className={classes.overlay}>
                    <Typography variant="h6">{post.name}</Typography>
                    <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
                    <a href={post.refLink} style={{textDecoration : 'none',color:'#FDF6F0'}} >
                    <OpenInNewIcon style={{marginTop: '20px'}}/>
                    </a>
                    <Typography component={Link} to={post.refLink}></Typography>
                </div>
                {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) &&
                    < div className={classes.overlay2}>
                        <Button style={{ color: 'whitesmoke' }} size="small" onClick={() => { setCurrentId(post._id) }}>
                            <MoreHoriz fontSize="default" />
                        </Button>
                    </div>
                }
             <ButtonBase
                    component="span"
                    name="test"
                    className={classes.cardAction}
                    onClick={openPost}
                >
                <div className={classes.details}>
                    <Typography variant="body2" color="textSecondary">{post.tags.map((tag) => `#${tag} `)}</Typography>
                    {/* <Typography variant="body2" color="textSecondary">{ post.refLink}</Typography> */}
                </div>
                <Typography className={classes.title} variant="h5" gutterBottom >{ post.title}</Typography>
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">{ post.desc}</Typography>
                </CardContent>
            </ButtonBase>
            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" disabled={!user?.result} onClick={() => dispatch(likePost(post._id)) }>
                     <Likes/>
                </Button>
                {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator)
                &&  (<Button size="small" color="primary" onClick={() => dispatch(deletePost(post._id))}>
                        <Delete fontSize="small" />
                        Delete
                    </Button>)
                }
               
            </CardActions>
        </Card>
    )
}

export default SinglePost
