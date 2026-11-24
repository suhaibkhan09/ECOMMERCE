import React, { useState } from 'react';
import { FiSend, FiCheckCircle } from 'react-icons/fi';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <section className="py-16 my-12 rounded-3xl bg-gradient-to-tr from-primary-700 via-primary-600 to-accent-600 text-white relative overflow-hidden shadow-2xl">
      <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
        <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-widest mb-3 backdrop-blur-md">
          VIP Access
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold font-display mb-4">
          Unlock 10% Off Your Next Order
        </h2>
        <p className="text-sm sm:text-base text-white/80 max-w-lg mx-auto mb-8">
          Join our global community of smart shoppers. Receive secret flash sales, product launch alerts, and styling guides directly in your inbox.
        </p>

        {submitted ? (
          <div className="inline-flex items-center gap-2 p-4 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 text-white text-sm font-semibold">
            <FiCheckCircle className="w-5 h-5 text-green-300" />
            <span>Success! We've sent your 10% discount code to your inbox.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              required
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-5 py-3.5 rounded-xl bg-white text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-4 focus:ring-white/30 shadow-lg"
            />
            <button
              type="submit"
              className="btn-accent py-3.5 px-7 text-sm font-bold shadow-lg flex items-center justify-center gap-2 shrink-0 bg-gray-950 hover:bg-black text-white"
            >
              <span>Join Now</span>
              <FiSend className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default Newsletter;
