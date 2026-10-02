import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';


// Initialize Stripe with PK from environment variable
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

function Payment() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold text-gray-800 tracking-wider mb-8 uppercase">
        Payment
      </h1>
      <div className="w-full max-w-xl bg-white p-8 rounded-lg shadow-sm">
        <Elements stripe={stripePromise}>
          <CheckoutForm></CheckoutForm>
        </Elements>
      </div>
    </div>
  );
}

export default Payment;