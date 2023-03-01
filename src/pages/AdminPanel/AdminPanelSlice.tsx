import { createSlice, createAsyncThunk, createEntityAdapter, PayloadAction} from "@reduxjs/toolkit";
import { useFirebase } from "../../hooks/firebase.hook";
import { IPatients } from "../../models/IPatients";

export type TypeLoadingStatus = 'idle' | 'loading' | 'error';


export interface IinitialStatePatients {
    patients: IPatients;
    patientsLoadingStatus: TypeLoadingStatus;
} 

const initialState: IinitialStatePatients = {
    patients: {
        id: '',
        name: '',
        age: 0,
        phone: '',
        email: '',
        complaints: '',
        other: '',
        severity: 0,
        date: '',
        dateCreated: 0,
        status: 'active'
    },
    patientsLoadingStatus: 'idle' 
}


export const fetchPatients = createAsyncThunk(
    'patients/fetchPatients',
    async () => {
        const {getPatients} = useFirebase();
        return await getPatients();
    }
);

const PatientsSlice = createSlice({
    name: 'patients',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPatients.pending, state => {state.patientsLoadingStatus = 'loading'})
            .addCase(fetchPatients.fulfilled, (state, action) => {
                state.patientsLoadingStatus = 'idle';
                state.patients = action.payload;
            })
            .addCase(fetchPatients.rejected, state => {state.patientsLoadingStatus = 'error'})
            .addDefaultCase(() => {});
    }
});

export const {reducer, actions} = PatientsSlice;

export default reducer;