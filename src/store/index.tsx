import {configureStore} from '@reduxjs/toolkit';
import login from '../pages/Login/LoginSlice';
import patients from '../pages/AdminPanel/AdminPanelSlice'
import { useDispatch } from 'react-redux';

const store = configureStore({
    reducer: {login, patients},
    middleware: getDefaultMiddleware => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== 'production'
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
