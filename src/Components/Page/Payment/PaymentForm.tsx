import React, { useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { toastNotify } from "../../../Helper";

function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [isprocessing, setIsProcessing] = useState(false);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsProcessing(true);
    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: "https://example.com/order/123/complete",
      },
      redirect:"if_required"
    });

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      toastNotify("An unexpected error occured.", "error");
      setIsProcessing(false);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
      console.log(result);
    }
  };

  return (
    <form className="pt-5" onSubmit={handleSubmit}>
      <PaymentElement />
      <button
        className="btn btn-lg btn-success form-control mt-3"
        style={{
          backgroundColor: "#fb641b",
          border: "none",
          borderRadius: "1px",
          boxShadow:
            "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
        }}
        disabled={!stripe}
      >
        SUBMIT
      </button>
    </form>
  );
}

export default PaymentForm;
