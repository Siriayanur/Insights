import { combineReducers } from 'redux';
import posts from './posts';
import auth from './auth';
import repos from './repos';

export default combineReducers({
    posts,
    auth,
    repos,
    //posts :posts
});