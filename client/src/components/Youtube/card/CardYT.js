import React from 'react'
import useStyles from './CardYTStyle';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import PeopleIcon from '@material-ui/icons/People';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { Card, CardMedia, Button, ButtonBase, Typography,CardActions,CardContent } from '@material-ui/core';
import moment from 'moment';
import millify from 'millify';

function CardYT({post}) {
    const classes = useStyles();
    const { kind, regionCode, channelData, videoData } = post;
    const { videoPublishTime,videoThumbnailUrl,videoTitle,videoViews,videoLikes,videoId,videoDesc} = videoData;
    const { channelTitle,channelId,channelSubscriberCount,channelVideoCount,channelViews } = channelData;
    // const likes = millify(videoLikes);

    return (
        <Card className={classes.card} elevation={6}>
             {/* image={post.selectedFile} title={post.title}  */}
            <CardMedia className={classes.media} image={videoThumbnailUrl}/>
            <div className={classes.overlay}>
                <Typography variant="body2">{ regionCode === "IN" ? "🇮🇳" : ""}</Typography>
                <Typography variant="body2">{moment(videoPublishTime).fromNow()}</Typography>
                <a style={{textDecoration: 'none'}} href={`https://www.youtube.com/watch?v=${videoId}`}>
                    <Typography variant="subtitle2" style={{color : '#FFF5DE'}}>Visit {<OpenInNewIcon/> }</Typography>
                </a>
            </div>
            <div className={classes.overlay2}>
                <Typography variant="body2">👁️‍🗨️ {videoViews ? millify(videoViews):''}</Typography>
                <Typography variant="body2">👍 {videoLikes ? millify(videoLikes) : ''}</Typography>
            </div>
            <div className={classes.videoDetails}>
                <Typography variant="body1" style={{ color: '#423F3E' }}>{videoTitle}</Typography>
                <a href={`https://www.youtube.com/channel/${channelId}`} style={{textDecoration : 'none'}}>
                    <Typography variant="subtitle2" style={{color: '#476072',marginLeft : '8px',fontStyle :'oblique',cursor : 'pointer'}}>{ channelTitle}</Typography>
                </a>
            </div>
                
            <div className={classes.videoDetails2}>
                <Typography variant="body2" color="textSecondary">{videoDesc && videoDesc.split(' ').splice(0, 20).join(' ')}...</Typography>
            </div>

            <CardActions className={classes.cardActions}>
                <div style={{display : 'flex',alignItems:'flex-end'}}>
                    <PeopleIcon style={{color: '#52006A',fontSize: '40px',marginRight: '5px'}}/>
                    <Typography variant="body2"> {channelSubscriberCount && millify(channelSubscriberCount)}</Typography>
                </div>
                <div style={{display : 'flex',alignItems:'flex-end'}}>
                    <SubscriptionsIcon style={{color: '#CD113B',fontSize: '40px',marginRight: '5px'}}/>
                    <Typography variant="body2"> {channelVideoCount && millify(channelVideoCount)}</Typography>
                </div>
                <div style={{display : 'flex',alignItems:'flex-end'}}>
                    <VisibilityIcon style={{color: '#FF7600',fontSize: '40px',marginRight: '5px'}}/>
                    <Typography variant="body2"> {channelViews && millify(channelViews)}</Typography>
                </div>

            </CardActions>
        </Card>
    )
}

export default CardYT;
