import { createSlice, createAsyncThunk, createEntityAdapter} from "@reduxjs/toolkit";
import { useFirebase } from "../../hooks/firebase.hook";

export type TypeloginLoadingStatus = 'idle' | 'loading' | 'error';

export interface IinitialState {
    login: {
        username: string;
        password: string;
    },
    loginLoadingStatus: TypeloginLoadingStatus;
    isAuth?: boolean
}

export interface IAuth {
    username: string;
    password: string;
}

const initialState: IinitialState = {
    login: {
        username: '',
        password: '',
    },
    loginLoadingStatus: 'idle', 
    isAuth: false
};

export const fetchLogin = createAsyncThunk(
    'login/fetchLogin',
    async () => {
        const {getAuth} = useFirebase();
        return await getAuth();
    }
);

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        loginIsAuth: (state, action) => {state.isAuth = action.payload}
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchLogin.pending, state => {state.loginLoadingStatus = 'loading'})
            .addCase(fetchLogin.fulfilled, (state, action) => {
                state.loginLoadingStatus = 'idle';
                state.login = action.payload;
            })
            .addCase(fetchLogin.rejected, state => {state.loginLoadingStatus = 'error'})
            .addDefaultCase(() => {});
    }
});

const {reducer, actions} = loginSlice;
export const {loginIsAuth} = actions;
export default reducer;
