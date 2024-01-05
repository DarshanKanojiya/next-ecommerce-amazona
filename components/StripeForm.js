import React from "react";
import { useState } from "react";

import { CardElement } from "@stripe/react-stripe-js";
import { toast } from "react-toastify";

// import BrandButton from "@components/buttons/BrandButton";
// import OutlineButton from "@components/buttons/OutlineButton";

// type stripeForm = {
//   stripe: any,
//   handleSubmit: any,
//   elements: any,
//   loading: boolean,
//   onClose: () => void,
//   handleBrand: any,
// };
const StripeForm = ({ stripe, onClose, elements }) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCardElementChange = (event) => {
    if (event.error) {
      setError(event.error.message);
    } else {
      setError("");
    }
  };

  const handleSubmit = async (e, stripe, elements) => {
    e.preventDefault();
    setLoading(true);
    const cardElement = elements.getElement(CardElement);
    const result = await stripe.createToken(cardElement);
    setLoading(false);
    if (result?.error?.message) {
    } else {
      toast.success("Token created successfully.");
      onClose();
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
              <button onClick={() => {}} className="primary-button w-auto">
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
