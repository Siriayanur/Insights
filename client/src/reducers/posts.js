//The state here has only one property that is posts
/***
 * we can have multiple propertie sin the state like :
    * state : {
    *  posts : [],
    *  users : [],
    *  categories : []
    * }
 * but here 
 *  state : {
 *      posts : []
 *  }
 * so we have named state as posts an the initial value is []
 * 
 */
/**
 * How it is dispatched from the actions:
 * 
 * action
 *  - type : FETCH_ALL,CREATE
 *  - payload : data that should be added,removed,updated whatever
 * 
 */
import { CREATE,UPDATE,DELETE,FETCH_ALL,FETCH_BY_SEARCH, START_LOADING, END_LOADING,LIKE,FETCH_POST,COMMENT} from '../constants/actionTypes';

const init_state = {
    isLoading: true,
    posts: [],
    //modify
    // repos : []
}

export default (state = init_state, action) => {
    switch (action.type) {
        case FETCH_ALL:
            return {...state,posts : action.payload.data,currentPage : action.payload.currentPage, totalNumberOfPages :action.payload.totalNumberOfPages };
        case CREATE:
            return { ...state, posts: [...state.posts, action.payload] };
        case UPDATE:
        case LIKE:
            return { ...state, posts: state.posts.map(post => post._id === action.payload._id ? action.payload : post) };
        case DELETE :
            return { ...state, posts: state.posts.filter(post => post._id !== action._id) }; //return all the posts except the one where the _id === action._id
        case FETCH_BY_SEARCH:
            return { ...state, posts: action.payload };
        case FETCH_POST:
            return { ...state, post: action.payload };
        case START_LOADING:
            return { ...state, isLoading: true };
        case END_LOADING:
            return { ...state, isLoading: false };
        case COMMENT:
            return {
                ...state, posts: state.posts.map(post => {
                     //If its the that received a comment then return the one coming from action.payload(with comments included)
                    if (post._id === action.payload._id) {
                        return action.payload;
                    }
                    //else return the same 
                    return post;
            })}
        
        default:
            return state;
    }
}