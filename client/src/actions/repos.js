import * as api from '../api'; //Import everything from api
import { END_LOADING, FETCH_REPOS, START_LOADING,FETCH_ALL_REPOS } from '../constants/actionTypes';


// export const fetchPostsBySearch = (searchQuery) => async (dispatch) => {
//     try {
//         dispatch({type : START_LOADING})

//         const { data: { data } } = await api.fetchPostsBySearch(searchQuery);
//         dispatch({ type: FETCH_BY_SEARCH, payload: data });
//         dispatch({type : END_LOADING})
//     } catch (e) {
//         console.log(e);
//     }
// }

//modify this to search for multiple tags using that chip and tags search functionality
export const getRepos = (tech) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })
        const { data } = await api.getRepos(tech);
        dispatch({ type: FETCH_REPOS, payload: data });
        dispatch({ type: END_LOADING });
    } catch (e) {
        console.log(e);
    }
}
export const getAllRepos = () => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.fetchAllRepos();
        dispatch({ type: FETCH_ALL_REPOS, payload: data });
        dispatch({ type: END_LOADING });
    } catch (e) {
        console.log(e);
    }
}