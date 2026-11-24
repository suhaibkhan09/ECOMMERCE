import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import CheckoutSteps from '../components/checkout/CheckoutSteps';
import ShippingForm from '../components/checkout/ShippingForm';
import PaymentForm from '../components/checkout/PaymentForm';
import OrderReview from '../components/checkout/OrderReview';
import CartSummary from '../components/cart/CartSummary';
import { selectCartItems, selectCartTotal, clearCart } from '../store/cartSlice';
import { placeOrder } from '../store/orderSlice';
import toast from 'react-hot-toast';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const cartTotals = useSelector(selectCartTotal);
  const user = useSelector((state) => state.auth.user);

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form Data
  const [shippingData, setShippingData] = useState({
    firstName: user?.name?.split(' ')[0] || 'John',
    lastName: user?.name?.split(' ').slice(1).join(' ') || 'Doe',
    email: user?.email || 'customer@example.com',
    phone: '+1 (555) 123-4567',
    street: '123 Market Street',
    city: 'San Francisco',
    state: 'CA',
    zip: '94103',
    country: 'US',
    shippingMethod: 'standard',
  });

  const [paymentData, setPaymentData] = useState({
    paymentMethod: 'card',
    cardName: user?.name || 'JOHN DOE',
    cardNumber: '4242 4242 4242 4242',
    cardExpiry: '12/28',
    cardCvv: '888',
  });

  const handlePlaceOrder = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      const orderPayload = {
        items,
        ...cartTotals,
        shippingAddress: shippingData,
        paymentMethod:
          paymentData.paymentMethod === 'card'
            ? `Credit Card (ending in ${paymentData.cardNumber.slice(-4)})`
            : paymentData.paymentMethod.toUpperCase(),
        trackingNumber: `TRK-${Math.floor(1000000000 + Math.random() * 9000000000)}`,
      };

      dispatch(placeOrder(orderPayload));
      dispatch(clearCart());
      toast.success('🎉 Your order was placed successfully!');
      navigate('/order-confirmation/latest');
    }, 1200);
  };

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <>
      <Helmet>
        <title>Secure Checkout — LuxeCart</title>
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <CheckoutSteps currentStep={currentStep} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          {/* Main Step Form Area */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 p-6 sm:p-10 shadow-sm">
            {currentStep === 1 && (
              <ShippingForm
                data={shippingData}
                onChange={setShippingData}
                onNext={() => setCurrentStep(2)}
              />
            )}

            {currentStep === 2 && (
              <PaymentForm
                data={paymentData}
                onChange={setPaymentData}
                onNext={() => setCurrentStep(3)}
                onBack={() => setCurrentStep(1)}
              />
            )}

            {currentStep === 3 && (
              <OrderReview
                shippingData={shippingData}
                paymentData={paymentData}
                onBack={() => setCurrentStep(2)}
                onPlaceOrder={handlePlaceOrder}
                isSubmitting={isSubmitting}
              />
            )}
          </div>

          {/* Sticky Order Summary */}
          <div className="lg:col-span-1 sticky top-28">
            <CartSummary isCheckout />
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
