// authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    user: null,
    token: null,
    loading: false,
    error: null,
    status: null,
};

export const signup = createAsyncThunk(
    'auth/signup',
    async (signupData, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:5000/api/users/signup', signupData, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true, // Important for handling cookies
            });
            return { data: response.data, status: response.status };
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const signin = createAsyncThunk(
    'auth/signin',
    async (signinData, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:5000/api/users/signin', signinData, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true, // Important for handling cookies
            });
            return { data: response.data, status: response.status };
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(signup.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.data.result;
                state.token = action.payload.data.accessToken; // Store the access token
                state.status = action.payload.status;
            })
            .addCase(signup.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(signin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signin.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.data.result;
                state.token = action.payload.data.accessToken; // Store the access token
                state.status = action.payload.status;
            })
            .addCase(signin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
