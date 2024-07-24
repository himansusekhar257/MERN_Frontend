// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import AuthSlice from './reducer/authreducer/AuthSlice';
import SubscriptionSlice from './reducer/subscriptionReducer/SubscriptionSlice';
import paymentSlice from './reducer/paymentSlice';

const store = configureStore({
  reducer: {
    auth: AuthSlice,
    subscriptions: SubscriptionSlice,
    payment: paymentSlice
  },
});

export default store;
