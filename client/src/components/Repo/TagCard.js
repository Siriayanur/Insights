import {Grid} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  tagStyle : {
    borderRadius : '30%',
    padding: '7px',
    backgroundColor: '#b6c9f0 ', 
    fontSize: '10px',
    boxShadow: ' 0px 4px 16px 1px rgba(127,113,113,0.75)',
    cursor:'pointer'
  }
});

export default function MyCard({lang}) {
  const classes = useStyles();  
  return (
      <Grid item className={classes.tagStyle} >
         <Link to={`/?tech=${lang}`} style={{textDecoration : 'none',color : 'inherit'}}> {lang} </Link> 
      </Grid>
    

  );


} 