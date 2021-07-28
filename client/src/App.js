import React from 'react'
import {  Container } from '@material-ui/core';
import { Redirect, Route, Switch } from 'react-router';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Repo from './components/Repo/Repo';
import Auth from './components/Auth/Auth';
import Youtube from './components/Youtube/Youtube';
import PostDetails from './components/PostDetails/PostDetails';

function App() {
    const user = JSON.parse(localStorage.getItem('profile'));
    return (
        <Container maxWidth="xl">
            <Navbar />
            <Switch>
                <Route exact path="/" component={() => <Redirect to="/posts"/>} />
                <Route path="/posts" exact component={Home} />
                <Route path="/posts/search" exact component={Home} />
                <Route path="/posts/:id" exact component={PostDetails} />
                <Route exact path="/auth" component={() => (!user ? <Auth /> : <Redirect to="/posts" />)} />
                <Route exact path="/repo" component={Repo} />
                <Route exact path="/channel" component={Youtube}/>
            </Switch>
        </Container>
    )
}

export default App
