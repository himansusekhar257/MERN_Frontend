import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define initial state
const initialState = {
    orderId: null,
    paymentId: null,
    paymentStatus: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
};

// Create async thunk for creating an order
export const createOrder = createAsyncThunk(
    'payment/createOrder',
    async ({ amount, userId, subscriptionId }) => {
        const response = await axios.post('http://localhost:5000/api/payment/create-order', { amount, userId, subscriptionId });
        return response.data;
    }
);

// Create async thunk for verifying payment
export const verifyPayment = createAsyncThunk(
    'payment/verifyPayment',
    async (paymentData) => {
        const response = await axios.post('http://localhost:5000/api/payment/verify-payment', paymentData);
        return response.data;
    }
);

// Create the slice
const paymentSlice = createSlice({
    name: 'payment',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createOrder.pending, (state) => {
                state.paymentStatus = 'loading';
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.paymentStatus = 'succeeded';
                state.orderId = action.payload.order_id;
                state.paymentId = null; // Reset paymentId until verified
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.paymentStatus = 'failed';
                state.error = action.error.message;
            })
            .addCase(verifyPayment.pending, (state) => {
                state.paymentStatus = 'loading';
            })
            .addCase(verifyPayment.fulfilled, (state, action) => {
                state.paymentStatus = 'succeeded';
                state.paymentId = action.payload.payment_id;
            })
            .addCase(verifyPayment.rejected, (state, action) => {
                state.paymentStatus = 'failed';
                state.error = action.error.message;
            });
    }
});

export default paymentSlice.reducer;
