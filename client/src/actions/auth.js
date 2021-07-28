import * as api from '../api'; //Import everything from api
import { AUTH } from '../constants/actionTypes';

export const signin = (formData,history) => async (dispatch) => {
    try {
         //log the user in
        const { data } = await api.signin(formData);
        dispatch({ type: AUTH, data });
        history.push('/')
    } catch (e) {
        console.log(e);
     }
}
export const signup = (formData,history) => async (dispatch) => {
    try {
         //sign the user up
        //destructuring result.data => usually it contains the headers,and all
        const { data } = await api.signup(formData);
        dispatch({ type: AUTH, data });
        history.push('/')
    } catch (e) {
        console.log(e);
     }
}