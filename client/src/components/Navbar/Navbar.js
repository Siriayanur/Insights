import React, { useEffect, useState } from 'react'
import { AppBar, Typography, Avatar, Button, Toolbar } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import GitHubIcon from '@material-ui/icons/GitHub';
import useStyles from './styles';
import YouTubeIcon from '@material-ui/icons/YouTube';
import { Link, useHistory, useLocation } from 'react-router-dom';
import decode from 'jwt-decode';
function Navbar() {
    const classes = useStyles();
    const dispatch = useDispatch()
    const location = useLocation();
    const history = useHistory();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    // console.log(user);

    //useEffect is called when the url is changed from one to another
    useEffect(() => {
        const token = user?.token;
        //JWT
        if (token) {
            const decodedToken = decode(token);
            if (decodedToken.exp * 1000 < new Date().getTime()) {
                logout();
            }
        }
        setUser(JSON.parse(localStorage.getItem('profile')))
    },[location])


    const logout = () => {
        dispatch({ type: 'LOGOUT' });
        history.push('/');
    }
    return (
        <div>
            <AppBar className={classes.appBar} position="static" color="inherit">
                <div className={classes.brandContainer}>
                     <Typography component={Link} to="/"  variant="h2" align="center" className={classes.heading}>
                        Insights
                     </Typography>
                    {/* <img  src={insight} className={classes.image}/> */}
                   </div>
                <Toolbar className={classes.toolbar}>
                    <Typography style={{marginLeft : '30px',textDecoration:'none',color: '#D83A56'}} component={Link} to="/repo"><GitHubIcon/> Github</Typography>
                    <Typography style={{marginLeft : '10px',marginRight : '10px',textDecoration:'none'}} component={Link} to="/channel"><YouTubeIcon/> Youtube</Typography>
                    {user?.result ? (
                        <div className={classes.profile}>
                            <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
                            <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography>
                            <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                        </div>
                    ) : (
                        <Button component={Link} to="/auth" variant="contained" style={{backgroundColor: '#DBE6FD',borderRadius: '10px'}}>Sign In</Button>
                    )}
                </Toolbar>
    </AppBar>
        </div>
    )
}

export default Navbar
