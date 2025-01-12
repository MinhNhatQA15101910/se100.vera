'use client';

import React from 'react';
import { createRoot } from 'react-dom/client';
import Modal from './Modal';

interface PlanModalProps {
  onClose?: (open: boolean) => void;
}

const PlanModal: React.FC<PlanModalProps> = ({ onClose }) => {
  const handleSubscribe = () => {
    alert(
      'Subscription successful! Thank you for subscribing to the Premium Plan.'
    );
    onClose?.(false);
  };

  return (
    <Modal
      isOpen={true}
      onChange={() => {
        onClose?.(false);
      }}
      title="Unlock Premium Features"
    >
      <div className="modal-content flex flex-col items-center text-center p-6">
        <h2 className="text-2xl font-bold mb-4 text-general-pink">
          Upgrade to Premium for Just $9/month
        </h2>
        <p className="text-blue-300 mb-6">
          Enjoy exclusive features, ad-free experience, and priority support.
        </p>
        <ul className="text-left text-blue-300 mb-6 space-y-2">
          <li className="flex items-center">
            <span className="mr-2 text-green-500">✓</span>
            Unlock all premium features
          </li>
          <li className="flex items-center">
            <span className="mr-2 text-green-500">✓</span>
            Enjoy an ad-free experience
          </li>
          <li className="flex items-center">
            <span className="mr-2 text-green-500">✓</span>
            Priority customer support
          </li>
        </ul>
        <button
          onClick={handleSubscribe}
          className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-md hover:bg-blue-700 transition-colors"
        >
          Subscribe for $9/month
        </button>
        <button
          onClick={() => onClose?.(false)}
          className="mt-4 text-gray-500 hover:text-gray-800 transition-colors"
        >
          No, thanks
        </button>
      </div>
    </Modal>
  );
};

let modalContainer: HTMLDivElement | null = null;
let root: any = null;

const showPlanModal = () => {
  if (!modalContainer) {
    modalContainer = document.createElement('div');
    document.body.appendChild(modalContainer);
    root = createRoot(modalContainer);
  }

  const closeModal = () => {
    if (modalContainer && root) {
      root.unmount();
      document.body.removeChild(modalContainer);
      modalContainer = null;
      root = null;
    }
  };

  root.render(<PlanModal onClose={closeModal} />);
};

export { showPlanModal };
