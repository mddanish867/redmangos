import React, { useState } from "react";
import { useSelector } from "react-redux";
import { cartItemModel, userModel } from "../../../Interfaces";
import { RootState } from "../../../Storage/Redux/store";
import { inputHelper } from "../../../Helper";
import { MiniLoader } from "../../../Pages/Common";
import { useInitiatePaymentMutation } from "../../../Apis/paymentApi";
import { useNavigate } from "react-router-dom";
import apiResponse from "../../../Interfaces/apiResponse";

function CartPickUpDetails() {

  const [loading, setLoading] = useState(false);
  const userData: userModel = useSelector((state: RootState) => state.userAuthStore);

  const shoppingCartFromStore: cartItemModel[] = useSelector(
    (state: RootState) => state.shoppingCartStore.cartItems ?? []
  );

  let grandTotal = 0;
  let totalItem = 0;
  shoppingCartFromStore?.map((cartItem: cartItemModel) => {
    totalItem += cartItem.quantity ?? 0;
    grandTotal += (cartItem.menuItem?.price ?? 0) * (cartItem.quantity ?? 0);
    return null;
  });

  //working with input control in cartPickUpDetails
  const initialUserData = {
    name: userData.fullName,
    email: userData.email,
    phoneNumber: ""
  };
  const [userInput, setUserInput] = useState(initialUserData);
  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tempData = inputHelper(e, userInput);
    setUserInput(tempData);
  };

  // Place holder button
  const [initiatePayment] = useInitiatePaymentMutation();
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // call payment API
    const {data}: apiResponse = await initiatePayment(userData.id);
    const orderSummary = {grandTotal, totalItem};
    navigate("/payment",{
      state : {apiResult: data?.result, userInput},
    });
  };
  return (
    <div className="col-lg-6 col-12 p-2">
      <div
        className="pb-5 pt-3"
        style={{ borderRight: 0, borderTop: 0, borderBottom: 0,boxShadow:"rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px" }}
      >
        <h1 style={{ fontWeight: "300" }} className="text-center text-success">
          Pickup Details
        </h1>

        <form onSubmit={handleSubmit} className="col-10 mx-auto">
          <div className="form-group mt-3">
            Pickup Name
            <input
              type="text"
              value={userInput.name}
              className="form-control"
              placeholder="name..."
              name="name"
              onChange={handleUserInput}
              required
            />
          </div>
          <div className="form-group mt-3">
            Pickup Email
            <input
              type="email"
              value={userInput.email}
              className="form-control"
              placeholder="email..."
              name="email"
              onChange={handleUserInput}
              required
            />
          </div>

          <div className="form-group mt-3">
            Pickup Phone Number
            <input
              type="number"
              value={userInput.phoneNumber}
              className="form-control"
              placeholder="phone number..."
              name="phoneNumber"
              onChange={handleUserInput}
              required
            />
          </div>
          <div className="form-group mt-3">
            <div className="card p-3" style={{ background: "ghostwhite" }}>
              <h5>Grand Total : ${grandTotal.toFixed(2)}</h5>
              <h5>No of items : {totalItem}</h5>
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-lg btn-success form-control mt-3"
            disabled={loading}
            style={{
              backgroundColor: "#fb641b",
              border: "none",
              borderRadius: "1px",
              boxShadow:"rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px"
            }}
          >
            {loading ? <MiniLoader /> : "PLACE ORDER"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CartPickUpDetails;
