import {createSlice} from '@reduxjs/toolkit';

interface IUserState
{
    user: any; // IUser | null;
}

export const initialState: IUserState = {
    user : null
};


// Slices
export const userSlice = createSlice({
    name : 'user',

    initialState,

    reducers : {
        loginSuccess : (state, action) => {
            state.user = action.payload;
        },

        logoutSuccess : (state, action) => {
            state.user = null;
        }
    }
});

export default userSlice.reducer;


interface IUserCredentials
{
    username: string;
    password: string;
}


// Actions
const {loginSuccess, logoutSuccess} = userSlice.actions;

export const login = ({username, password}: IUserCredentials) => async (dispatch: any): Promise<void> => {
    try {
        // const res = await api.post('/api/auth/login/', { username, password })
        dispatch(loginSuccess({username}));
    }
    catch (e) {
        return console.error(e.message);
    }
};

export const logout = () => async (dispatch: any): Promise<any> => {
    try {
        // const res = await api.post('/api/auth/logout/')
        return dispatch(logoutSuccess({}));
    }
    catch (e) {
        return console.error(e.message);
    }
};
