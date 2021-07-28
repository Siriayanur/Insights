import { Card, CardContent,CardActions, Grid, Typography, Link } from "@material-ui/core";
import TagCard from './TagCard';
import { makeStyles } from '@material-ui/styles';
import StarIcon from '@material-ui/icons/Star';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import AccountCircleSharpIcon from '@material-ui/icons/AccountCircleSharp';

const useStyles = makeStyles({
    starForkStyle: {
        color : '#da7f8f'
    },
    starForkFontStyle: {
        color:'#21094e'
    },
    typographyTitleStyle: {
        marginBottom: '13px',
        color:'#393e46'
    },
    typographyDescStyle: {
        marginTop: '12px',
        color:'#766161'
    },
    
    
});


export default function RepoCard({ post }) {
    console.log(post);
    const classes = useStyles();
    // const { post } = props;
    const repoUrl = `https://github.com/${post['username']}/${post['repoName']}`;
    return (
        <Card className={classes.root} variant="outlined">
            <CardContent>
                <a href={repoUrl} style={{textDecoration:'none'}}>
                    <Typography variant="h5" className={classes.typographyTitleStyle}>
                        {post['repoName']}
                    </Typography>
                </a>
            {post['languages'].length !== 0 ?
                (
                    <Grid item container spacing={2} direction="row">
                        {
                            post['languages'].map((lang, i) =>
                                <Grid key={i} item>{<TagCard lang={lang} />}</Grid>)
                        }
                    </Grid>
                ) :
                <Grid />
            }
            {post['description'] !== null ? (<Typography variant="body1" className={classes.typographyDescStyle}>
                        {post['description']}
            </Typography>) : (<Typography variant="body1" className={classes.typographyDescStyle}>
                       ..No description..
            </Typography>)}
            
            
        </CardContent>
        <CardActions>
        <Grid container spacing={1}>  
            <Grid item>
                <StarIcon className={classes.starForkStyle}/>
            </Grid>      
            <Grid item>
                <Typography variant="h6" className={classes.starForkFontStyle}>{post['stars']}</Typography> 
            </Grid>
        </Grid>
        <Grid container spacing={1}>
            <Grid item>
                    <RestaurantIcon className={classes.starForkStyle}/>
            </Grid>
            <Grid item>
                <Typography variant="h6" className={classes.starForkFontStyle}>{post['forks']}</Typography>
            </Grid>
        </Grid>
        <Grid container spacing={1}>
                    <Grid item>
                        {post['avatarUrl']
                            ?
                            ( <img style={{ height:'32px', width:'32px',borderRadius:'50%' }} src={ post['avatarUrl'] }/>)
                            :
                            (<AccountCircleSharpIcon className={classes.starForkStyle}/>) 
                       }
            </Grid>
            <Grid item>
                <a href={post['userProfileUrl']} style={{textDecoration:'none'}}>
                    <Typography variant="body1" className={classes.starForkFontStyle}>{post['username']}</Typography>
                </a>
            </Grid>
        </Grid>
      </CardActions>
    </Card>
        
    );
}
