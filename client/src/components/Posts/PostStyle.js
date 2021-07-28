import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  mainContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  smMargin: {
    margin: theme.spacing(1),
  },
  actionDiv: {
    textAlign: 'center',
  },
  paper: {
    backgroundColor: 'whitesmoke',
    padding: '20px',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'sans-serif',
    display:'flex'
  },
  text: {
    color: '#47597E',
    textAlign: 'center',
    alignItems: 'center'
  }
}));