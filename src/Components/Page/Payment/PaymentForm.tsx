import React, { useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { toastNotify } from "../../../Helper";
import { orderSummaryProps } from "../Order/OrderSummaryProps";
import { cartItemModel } from "../../../Interfaces";
import { useCreateOrderMutation } from "../../../Apis/orderApi";
import apiResponse from "../../../Interfaces/apiResponse";
import { SD_Status } from "../../../Utility/SD";
import { useNavigate } from "react-router-dom";

function PaymentForm({ data, userInput }: orderSummaryProps) {
  const stripe = useStripe();
  const elements = useElements();
  let navigate = useNavigate();
  // call createOrderAPI
  const [createOrder] = useCreateOrderMutation();
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
      redirect: "if_required",
    });

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      toastNotify("An unexpected error occured.", "error");
      setIsProcessing(false);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
      let grandTotal = 0;
      let totalItem = 0;
      const orderDetailsDTO: any = [];
      data.cartItems?.forEach((item: cartItemModel) => {
        const tempOrderDetail: any = {};
        tempOrderDetail["menuItemId"] = item.menuItem?.id;
        tempOrderDetail["quantity"] = item.quantity;
        tempOrderDetail["itemName"] = item.menuItem?.name;
        tempOrderDetail["price"] = item.menuItem?.price;
        orderDetailsDTO.push(tempOrderDetail);
        grandTotal += item.quantity! * item.menuItem?.price!;
        totalItem += item.quantity!;
      });

      const response: apiResponse = await createOrder({
        pickupName: userInput.name,
        pickupPhoneNumber: userInput.phoneNumber,
        pickupEmail: userInput.email,
        totalItems: totalItem,
        orderTotal: grandTotal,
        orderDetailsDTO: orderDetailsDTO,
        stripePaymentIntentID: data.stripePaymentIntentId,
        applicationUserId: data.userId,
        status:
          result.paymentIntent.status === "succeeded"
            ? SD_Status.CONFIRMED
            : SD_Status.PENDING,
      });
      if (response) {
        if (response.data?.result.status === SD_Status.CONFIRMED) {
          navigate(
            `/order/orderConfirmed/${response.data.result.orderHeaderId}`
          );
        } else {
          navigate("/failed");
        }
      }
      setIsProcessing(false);
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
        disabled={!stripe || isprocessing}
      >
        <span id="button-text">
          {isprocessing ? "Processing..." : "SUBMIT ORDER"}
        </span>        
      </button>
    </form>
  );
}

export default PaymentForm;
