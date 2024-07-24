// slices/subscriptionSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define initial state
const initialState = {
    subscriptions: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
};

// Create async thunk for fetching subscriptions
export const fetchSubscriptions = createAsyncThunk(
    'subscriptions/fetchSubscriptions',
    async ({ token }, { rejectWithValue }) => {
        try {
            const response = await axios.get('http://localhost:5000/api/get-subscription', {
                headers: {
                    'Authorization': `Bearer ${token}`, // Include the token in the request headers
                },
            });
            return response.data.subscriptions;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Create the slice
const subscriptionSlice = createSlice({
    name: 'subscriptions',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSubscriptions.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchSubscriptions.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.subscriptions = action.payload;
            })
            .addCase(fetchSubscriptions.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || action.error.message;
            });
    }
});

// Export the reducer
export default subscriptionSlice.reducer;
