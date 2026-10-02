import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import useCartsData from '../../../hooks/useCartsData';


const CheckoutForm = () => {
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [processing, setProcessing] = useState(false);

    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [cart, refetch] = useCartsData();

    // Calculate total price safely
   const totalPrice = cart?.reduce((total, item) => total + parseFloat(item.price || 0), 0) || 0;

    // Get Payment Intent clientSecret from Server
    useEffect(() => {
        // Check if totalPrice is greater than 0 before API call
        if (totalPrice > 0) {
            axiosSecure
                .post('/create-payment-intent', { price: totalPrice })
                .then((res) => {
                    if (res.data?.clientSecret) {
                        setClientSecret(res.data.clientSecret);
                    }
                })
                .catch((err) => {
                    console.error("Client Secret Error:", err);
                });
        }
    }, [axiosSecure, totalPrice]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements || !clientSecret) return;

        const card = elements.getElement(CardElement);
        if (!card) return;

        setProcessing(true);
        setError('');

        // Confirm Card Payment with Stripe
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous',
                },
            },
        });

        if (confirmError) {
            setError(confirmError.message);
            setProcessing(false);
            return;
        }

        if (paymentIntent.status === 'succeeded') {
            // Create payment object to insert into DB
            const paymentInfo = {
                email: user?.email,
                price: totalPrice,
                transactionId: paymentIntent.id,
                date: new Date(),
                cartIds: cart.map(item => item._id),
                menuItemIds: cart.map(item => item.menuId),
                status: 'service pending',
            };

            // Save to database & clear cart
            const res = await axiosSecure.post('/payments', paymentInfo);

            if (res.data?.paymentResult?.insertedId) {
                refetch(); // Clear cart in UI
                Swal.fire({
                    icon: 'success',
                    title: 'Payment Successful!',
                    text: `Transaction ID: ${paymentIntent.id}`,
                });
            }
            setProcessing(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full space-y-6">
            {/* Input container matching UI layout */}
            <div className="border border-gray-300 rounded-md p-4 bg-white shadow-sm">
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#32325d',
                                '::placeholder': { color: '#aab7c4' },
                            },
                            invalid: { color: '#fa755a' },
                        },
                    }}
                />
            </div>

            {/* Styled Submit Button */}
            <div className="text-center">
                <button
                    type="submit"
                    disabled={!stripe || !clientSecret || processing || totalPrice <= 0}
                    className="w-48 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-6 rounded-md transition-colors disabled:bg-gray-400"
                >
                    {processing ? "Processing..." : "Pay"}
                </button>
            </div>

            {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}
        </form>
    );
};

export default CheckoutForm;