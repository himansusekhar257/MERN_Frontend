import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSubscriptions } from '../reducer/subscriptionReducer/SubscriptionSlice';
import { createOrder, verifyPayment } from '../reducer/paymentSlice';
import Modal from 'react-modal';

// Function to generate colors based on subscription name
const generateColor = (name) => {
    const hash = name.split('').reduce((acc, char) => char.charCodeAt(0) + ((acc << 5) - acc), 0);
    const hue = hash % 360;
    return `hsl(${hue}, 70%, 80%)`;
};

// Set the root element for the modal
Modal.setAppElement('#root');

const MembershipPage = () => {
    const dispatch = useDispatch();
    const { status, error, subscriptions } = useSelector((state) => state.subscriptions);
    const { user } = useSelector((state) => state.auth);
    const { paymentStatus, orderId, paymentId } = useSelector((state) => state.payment);
    const token = useSelector((state) => state.auth.token);

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedSubscription, setSelectedSubscription] = useState(null);

    useEffect(() => {
        if (token) {
            dispatch(fetchSubscriptions({ token }));
        }
    }, [dispatch, token]);

    const handlePayment = async () => {
        if (selectedSubscription) {
            try {
                const { amount, _id: subscriptionId } = selectedSubscription;
                const userId = user._id; // Get userId from your auth state or context
                const response = await dispatch(createOrder({ amount, userId, subscriptionId }));

                if (response.meta.requestStatus === 'fulfilled') {
                    const { order_id } = response.payload;
                    const options = {
                        key: process.env.REACT_APP_RAZORPAY_KEY_ID, // Replace with your Razorpay key
                        amount: selectedSubscription.amount * 100,
                        currency: "INR",
                        name: "Your Company",
                        description: "Subscription Payment",
                        order_id: order_id,
                        handler: async (response) => {
                            const paymentData = {
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                                userId,
                                subscriptionId
                            };

                            await dispatch(verifyPayment(paymentData));
                            setModalIsOpen(false); // Close the modal after payment verification
                        },
                        prefill: {
                            name: '',
                            email: '',
                            contact: ''
                        }
                    };

                    const paymentObject = new window.Razorpay(options);
                    paymentObject.open();
                }
            } catch (error) {
                console.error("Error during payment process:", error);
            }
        }
    };

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (status === 'failed') {
        return <div>Error: {error}</div>;
    }

    return (
        <div style={{ marginTop: 20, display: 'flex', justifyContent: 'center', gap: 20 }}>
            {subscriptions.map((subscription) => (
                <div
                    key={subscription._id}
                    style={{
                        border: `2px solid #a3c2c2`,
                        borderRadius: 10,
                        height: 400,
                        width: 300,
                        backgroundColor: generateColor(subscription.name), // Dynamic color
                        boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                        padding: 20,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center'
                    }}
                >
                    <h2 style={{ margin: '10px 0', color: '#a3c2c2' }}>{subscription.name}</h2>
                    <p style={{ margin: '10px 0', fontStyle: 'italic' }}>
                        Great for individuals who need basic benefits.
                    </p>
                    <h3 style={{ margin: '10px 0', color: '#a3c2c2' }}>${subscription.amount}</h3>
                    <p style={{ margin: '10px 0' }}>{subscription.duration} months</p>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {subscription.benefits.map((benefit, idx) => (
                            <li key={idx} style={{ margin: '5px 0' }}>{benefit}</li>
                        ))}
                    </ul>
                    <button
                        style={{
                            marginTop: 'auto',
                            backgroundColor: '#a3c2c2',
                            color: '#fff',
                            border: 'none',
                            padding: '10px 20px',
                            borderRadius: 5,
                            cursor: 'pointer'
                        }}
                        onClick={() => {
                            setSelectedSubscription(subscription);
                            setModalIsOpen(true);
                        }}
                    >
                        Choose Plan
                    </button>
                </div>
            ))}

            {/* Modal for payment */}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                contentLabel="Payment Modal"
                style={{
                    content: {
                        top: '50%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        marginRight: '-50%',
                        transform: 'translate(-50%, -50%)',
                        width: '300px',
                        textAlign: 'center',
                    }
                }}
            >
                <h2>Your Plan</h2>
                {selectedSubscription && (
                    <div>
                        <p>Amount: ${selectedSubscription.amount}</p>
                        <button
                            onClick={handlePayment}
                            style={{
                                backgroundColor: '#a3c2c2',
                                color: '#fff',
                                border: 'none',
                                padding: '10px 20px',
                                borderRadius: 5,
                                cursor: 'pointer',
                                marginTop: '20px'
                            }}
                        >
                            Pay Now
                        </button>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default MembershipPage;
