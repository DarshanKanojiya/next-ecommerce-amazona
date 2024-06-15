import { NextPage } from "next";
import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { CardElement } from "@stripe/react-stripe-js";
import { StripeFormProps } from "../types";

const StripeForm: NextPage<StripeFormProps> = ({ stripe, onClose, elements, successOrder }) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCardElementChange = (event: any) => {
    if (event.error) {
      setError(event.error.message);
    } else {
      setError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent, stripe: any, elements: any) => {
    e.preventDefault();
    setLoading(true);
    const cardElement = elements.getElement(CardElement);
    const result = await stripe.createToken(cardElement);
    setLoading(false);
    if (result?.error?.message) {
    } else {
      toast.success("Your order placed successfully.");
      onClose();
      successOrder();
    }
  };

  return (
    <form onSubmit={(e) => handleSubmit(e, stripe, elements)}>
      {stripe && (
        <>
          <div className="mb-5">
            <CardElement
              onChange={handleCardElementChange}
              className="my-card-element"
            />
            {error && <p className="text-red-500">{error}</p>}
          </div>
          <div className="flex gap-2">
            <div className="flex gap-2 items-center border-gray-200 rounded-b dark:border-gray-600">
              <button onClick={() => { }} className="primary-button w-auto">
                {loading ? "Loading..." : "Submit"}
              </button>
              <button onClick={onClose} className="primary-button w-auto">
                Cancel
              </button>
            </div>
          </div>
        </>
      )}
    </form>
  );
};

export default StripeForm;
