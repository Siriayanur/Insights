import * as api from '../api'; //Import everything from api
import { CREATE,UPDATE,DELETE,FETCH_ALL,FETCH_BY_SEARCH, START_LOADING, END_LOADING,FETCH_POST,COMMENT} from '../constants/actionTypes';
//redux thunk

//Actions Creators
export const getPosts = (page) => async (dispatch) => {
    //An extra (dispatch) => provided by redux thunk
    try {
        dispatch({type : START_LOADING})

        // destructure data from result { result.data }
        const { data } = await api.fetchPosts(page);
        dispatch({ type: FETCH_ALL, payload: data });
        
        dispatch({type : END_LOADING})

    } catch (e) {
        console.log(e);
    }
}

export const createPost = (post,history) => async (dispatch) => {
    try
    {
        dispatch({type : START_LOADING})

        const { data } = await api.createPost(post);
        history.push(`/posts/${data._id}`);
        dispatch({ type: CREATE, payload: data });
        dispatch({type : END_LOADING})

    } catch (e) {
        console.log(e);
    }
}

export const updatePost = (id,updatedPostData) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, updatedPostData);
        dispatch({ type: UPDATE, payload: data });
    } catch (e) {
        console.log(e);
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id);
        dispatch({ type:DELETE, payload: id });
    } catch (e) {
        console.log(e);
    }
}
export const likePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.likePost(id);
        dispatch({ type: UPDATE, payload: data });
    } catch (e) {
        console.log(e);
    }
}

export const commentPost = (comment, postId) => async (dispatch) => {
    try {
        const { data } = await api.commentPost(comment, postId);
        dispatch({ type: COMMENT, payload: data });
        return data.comments;
    } catch (e) {
        console.log(e);
    }
}

export const fetchPostsBySearch = (searchQuery) => async (dispatch) => {
    try {
        dispatch({type : START_LOADING})

        const { data: { data } } = await api.fetchPostsBySearch(searchQuery);
        dispatch({ type: FETCH_BY_SEARCH, payload: data });
        dispatch({type : END_LOADING})
    } catch (e) {
        console.log(e);
    }
}
export const getPost = (id) => async (dispatch) => {
    try {
        dispatch({type : START_LOADING})
        const {data } = await api.fetchPost(id);
        dispatch({ type: FETCH_POST, payload: data });
        dispatch({type : END_LOADING})

    } catch (e) {
        console.log(e);
        
    }
}
