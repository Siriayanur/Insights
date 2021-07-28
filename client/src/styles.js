import { makeStyles } from '@material-ui/core'

export default makeStyles((theme) => ({
    appBar: {
        borderRadius: 15,
        margin: '30px 0',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center'
    },
    heading: {
        color: '#04009A'
    },
    image: {
        marginLeft: '15px',
        height: '80px',
        width:'100px'
    },
    //For the mobile responsivenes whatever style is written below this will cause it to be mobile responsive
    [theme.breakpoints.down('sm')]: {
        maincontainer: {
            flexDirection : 'column-reverse',
        }
    }
    
}));