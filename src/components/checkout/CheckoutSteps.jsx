import React from 'react';
import { FiCheck, FiTruck, FiCreditCard, FiCheckCircle } from 'react-icons/fi';

const CheckoutSteps = ({ currentStep = 1 }) => {
  const steps = [
    { number: 1, label: 'Shipping', icon: FiTruck },
    { number: 2, label: 'Payment', icon: FiCreditCard },
    { number: 3, label: 'Review', icon: FiCheckCircle },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto mb-10">
      <div className="flex items-center justify-between relative">
        {/* Background Connecting Line */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 w-full bg-gray-200 dark:bg-gray-700 z-0" />
        {/* Active Progress Line */}
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-primary-600 transition-all duration-300 z-0"
          style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
        />

        {steps.map((step) => {
          const isCompleted = currentStep > step.number;
          const isCurrent = currentStep === step.number;
          const Icon = step.icon;

          return (
            <div key={step.number} className="relative z-10 flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 shadow-sm ${
                  isCompleted
                    ? 'bg-green-500 text-white'
                    : isCurrent
                    ? 'bg-primary-600 text-white ring-4 ring-primary-500/20 scale-110'
                    : 'bg-white dark:bg-gray-800 text-gray-400 border border-gray-300 dark:border-gray-600'
                }`}
              >
                {isCompleted ? <FiCheck className="w-5 h-5" /> : <Icon className="w-4 h-4" />}
              </div>
              <span
                className={`text-xs mt-2 font-semibold ${
                  isCurrent
                    ? 'text-primary-600 dark:text-primary-400'
                    : isCompleted
                    ? 'text-gray-900 dark:text-gray-100'
                    : 'text-gray-400'
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CheckoutSteps;
