import {END_LOADING, FETCH_ALL_REPOS, FETCH_REPOS, START_LOADING} from '../constants/actionTypes';

const init_state = {
    isLoading: true,
    repos: []
};

export default (state = init_state, action) => {
    switch (action.type) {
        case FETCH_REPOS:
            return { ...state, repos: [...state.repos, action.payload] };
        case FETCH_ALL_REPOS:
            return { ...state, repos: [...state.repos, action.payload] };
        case START_LOADING:
            return { ...state, isLoading: true };
        case END_LOADING:
            return { ...state, isLoading: false };
        default:
            return state;
    }
}
