import React from "react";
import { useLocation } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "../Components/Page/Payment/PaymentForm";
import OrderSummary from "../Components/Page/Order/OrderSummary";

function Payment() {
  const {
    state: { apiResult, userInput },
  } = useLocation();

  // Publishable key
  const stripePromise = loadStripe(
    "pk_test_51MG6xmDU3OjDrP4GJV8avgtFNNGxikOffHWtYgncDFkahat38KLX3foPPgFbk0JHNG2FmYhIpSNl2lqbnR3uEfRM00Bv0LptTW"
  );
  const options = {
    // passing the client secret obtained from the server
    clientSecret: apiResult.clientSecret,
  };
  return (
    <Elements stripe={stripePromise} options={options}>
      <div className="container m-5 p-5">
        <div className="row">
          <div className="col-md-7">
          <OrderSummary data = {apiResult} userInput = {userInput}/>
          </div>
          <div className="col-md-5">
            <h3 className="text-success">Payment</h3>
            <PaymentForm />           
          </div>
        </div>
      </div>
    </Elements>
  );
}

export default Payment;
