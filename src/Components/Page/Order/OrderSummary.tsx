import { orderSummaryProps } from "./OrderSummaryProps";
import { cartItemModel } from "../../../Interfaces";
import { getStatusColor } from "../../../Helper";
import { useNavigate } from "react-router-dom";
import { SD_Roles, SD_Status } from "../../../Utility/SD";
import { useSelector } from "react-redux";
import { RootState } from "../../../Storage/Redux/store";
import { useState } from "react";
import { useUpdateOrderHeaderMutation } from "../../../Apis/orderApi";
import { MainLoader } from "../Common";

function OrderSummary({ data, userInput }: orderSummaryProps) {
  const badgeTpeColor = getStatusColor(data.status!);
  const navigate = useNavigate();
  const userData = useSelector((state: RootState) => state.userAuthStore);
  const [loading, setIsLoading] = useState(false);
  const [updateOrderHeader] = useUpdateOrderHeaderMutation();
  const nextStatus: any =
    data.status! === SD_Status.CONFIRMED
      ? { color: "info", value: SD_Status.BEING_COOKED }
      : data.status! === SD_Status.BEING_COOKED
      ? { color: "warning", value: SD_Status.READY_FOR_PICKUP }
      : data.status! === SD_Status.READY_FOR_PICKUP && {
          color: "success",
          value: SD_Status.COMPLETED,
        };
  // const handleNextStatus = async () => {
  //   setIsLoading(true);
  //   await updateOrderHeader({
  //     orderHeaderId: data.id,
  //     status: nextStatus.value,
  //   });
  //   setIsLoading(false);
  // };

  const handleNextStatus = async () => {
    setIsLoading(true);
    await updateOrderHeader({
      orderHeaderId: data.id,
      status: nextStatus.value,
    });

    setIsLoading(false);
  };

  const handleCancel = async () => {
    setIsLoading(true);
    await updateOrderHeader({
      orderHeaderId: data.id,
      status: SD_Status.CANCELLED,
    });
    setIsLoading(false);
  };

  return (
    <div>
      {loading && <MainLoader />}
      {!loading && (
        <>
          <div className="d-flex justify-content-between align-items-center">
            <h3 className="text-success">Order Summary</h3>
            <span
              className={`btn btn-outline-${badgeTpeColor} fs-6`}
              style={{ borderRadius: 1 }}
            >
              {data.status}
            </span>
          </div>
          <div className="mt-3">
            <div className="border py-3 px-2">Name : {userInput.name}</div>
            <div className="border py-3 px-2">Email : {userInput.email}</div>
            <div className="border py-3 px-2">
              Phone : {userInput.phoneNumber}
            </div>
            <div className="border py-3 px-2">
              {data.cartItems?.map((cartItem: cartItemModel, index: number) => {
                return (
                  <div className="d-flex" key={index}>
                    <div className="d-flex w-100 justify-content-between">
                      <p>{cartItem.menuItem?.name}</p>
                      <p>
                        ${cartItem.menuItem?.price} * {cartItem.quantity} =
                      </p>
                    </div>
                    <p style={{ width: "70px", textAlign: "right" }}>
                      $
                      {(cartItem.menuItem?.price ?? 0) *
                        (cartItem.quantity ?? 0)}
                    </p>
                  </div>
                );
              })}
              <h4 className="text-success">Menu Items</h4>
              <div className="p-3">
                <hr />
                <h4 className="text-danger" style={{ textAlign: "right" }}>
                  ${data.cartTotal?.toFixed(2)}
                </h4>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center mt-3">
            {/* // back to previous page from OrderSummary */}
            <button
              className="btn btn-secondary"
              style={{ borderRadius: 1 }}
              onClick={() => navigate(-1)}
            >
              Back <i className="bi bi-arrow-return-left mt-2"></i>
            </button>

            {/* // display button for Admin and color based on the status and show cancel button if status is not cancelled or Completed */}
            {userData.role === SD_Roles.ADMIN && (
              <div className="d-flex">
                {data.status! !== SD_Status.CANCELLED &&
                  data.status! !==
                    SD_Status.COMPLETED &&(
                      <button
                        className="btn btn-danger mx-2"
                        style={{ borderRadius: 1 }}
                        onClick={handleCancel}
                      >
                        Cancel
                      </button>
                    )}

                <button
                  className={`btn btn-${nextStatus.color} text-white`}
                  style={{ borderRadius: 1 }}
                  onClick={handleNextStatus}
                >
                  {nextStatus.value}
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default OrderSummary;
