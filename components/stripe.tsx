import { NextPage } from "next";
import React from "react";
import {
  Elements,
  ElementsConsumer,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js/pure";
import StripeForm from "./StripeForm";
import { StripeProps } from "../types";

const Stripe: NextPage<StripeProps> = ({ onClose, successOrder }) => {
  const stripePromise = loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_KEY}`);
  return (
    <div
      id="default-modal"
      aria-hidden="true"
      className="backdrop-blur-md flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
    >
      <div className="relative p-4 w-full max-w-2xl max-h-full">
        <div className="relative bg-white rounded-lg shadow">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
            <h3 className="text-xl font-semibold text-gray-900">Stripe</h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
              data-modal-hide="default-modal"
              onClick={onClose}
            >
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          <div className="p-4 md:p-5 space-y-4">
            <Elements stripe={stripePromise}>
              <ElementsConsumer>
                {({ stripe, elements }) => (
                  <StripeForm
                    stripe={stripe}
                    elements={elements}
                    onClose={onClose}
                    successOrder={successOrder}
                  />
                )}
              </ElementsConsumer>
            </Elements>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stripe;
