import {Paper, Avatar, Button, Container, Grid, Typography } from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
import React,{useState} from 'react'
import useStyles from './style';
import { useDispatch } from 'react-redux';
import { GoogleLogin } from 'react-google-login';
import { useHistory } from 'react-router-dom';
import { signup, signin } from '../../actions/auth';
import Input from './Input';
import icon from './icon';

const initial_form_data = { firstName: '', lastName: "", email: "", password: "", confirmPassword: "" };


function Auth() {
    const classes = useStyles();
    const history = useHistory();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const [formData, setFormData] = useState(initial_form_data);
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(formData);
        if (isSignup) {
            dispatch(signup(formData, history));
        } else {
            dispatch(signin(formData, history));
        }
    }
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value });
    }
    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
    }
    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);
    
    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;
        try {
            dispatch({ type: 'AUTH', data: { result, token } });
            history.push('/');
        } catch (e) {
            console.log(e);
        }
     };
    const googleFailure = (e) => {
        console.log(e)
     };
    return (
        <Container component="main" className={classes.main}>
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlined/>
                </Avatar>
                <Typography variant="h5">
                    {isSignup ? 'SIGN UP' : 'SIGN IN'}
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignup && (
                                <>
                                   <Input name="firstName" label="First Name" handleChange={handleChange } autoFocus={true} half/>
                                   <Input name="lastName" label="Last Name" handleChange={handleChange} type="text" half /> 
                                </>
                            )
                        }
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" autoFocus={true} />
                        <Input
                            name="password"
                            label="Password"
                            handleChange={handleChange}
                            type={showPassword ? "text" : "password"}
                            handleShowPassword = {handleShowPassword}
                        />
                        {isSignup &&
                            <Input
                            name="confirmPassword"
                            label="Confirm Password"
                            handleChange={handleChange}
                            type="password"
                        />}
                    </Grid>
                    <GoogleLogin
                        clientId="891137672722-85gsjui24nqud95sb76euu2a2f1s13dp.apps.googleusercontent.com"
                        render={renderProps => (
                            <Button
                                className={classes.googleButton}
                                color="primary" fullWidth
                                onClick={renderProps.onClick}
                                disabled={renderProps.disabled}
                                startIcon={icon}>
                                Google Sign In
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                    />
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} >
                        {isSignup ? 'SIGN UP' : 'SIGN IN'}
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignup ? 'Already have an account ? Sign In' : 'Dont have an account ? Sign Up'}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth
