import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetMenuItemByIdQuery } from "../Apis/menuItemApi";
import { useUpdateShoppingCartMutation } from "../Apis/shoppingCartApi";
import { MainLoader, MiniLoader } from "./Common";
import apiResponse from "../Interfaces/apiResponse";
import { toastNotify } from "../Helper";
import { useSelector } from "react-redux";
import { RootState } from "../Storage/Redux/store";
import { userModel } from "../Interfaces";

function MenuItemDetails() {
  const { menuItemId } = useParams();
  const { data, isLoading } = useGetMenuItemByIdQuery(menuItemId);
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState<boolean>(false);
  const [updateShoppingCart] = useUpdateShoppingCartMutation();
  const userData: userModel = useSelector((state: RootState) => state.userAuthStore);

  const handleQuanity = (counter: number) => {
    let newQuanitity = quantity + counter;
    if (newQuanitity === 0) {
      newQuanitity = 1;
    }
    setQuantity(newQuanitity);
    return;
  };

  // Add to cart functionality
  const handleAddToCart = async (menuItemId: number) => {

     // checking if user is Authenticated or not
     if(!userData.id){
      navigate("/login");
      return;
    }
    setIsAddingToCart(true);
    const response: apiResponse = await updateShoppingCart({
      menuItemId: menuItemId,
      updateQuantityBy: quantity,
      userId: userData.id,
    });
    if (response.data && response.data.isSuccess) {
      toastNotify("Item added to the cart successfully!");
    }
    setIsAddingToCart(false);
  };
  return (
    <div className="container pt-4 pt-md-5">
      {!isLoading ? (
        <div className="row">
          <div className="col-7">
            <h2 className="text-success">{data.result?.name}</h2>
            <span>
              <span
                className="badge text-bg-dark pt-2"
                style={{ height: "40px", fontSize: "20px" }}
              >
                {data.result?.category}
              </span>
            </span>
            <span>
              <span
                className="badge text-bg-light pt-2"
                style={{ height: "45px", fontSize: "20px" }}
              >
                {data.result?.sepcialTag}
              </span>
            </span>
            <p style={{ fontSize: "20px" }} className="pt-2">
              {data.result?.description}
            </p>
            <span className="h5 text-muted">${data.result?.price}</span> &nbsp;&nbsp;&nbsp;
            <span
              className="pb-2  p-3"
              style={{ border: "1px solid #333", borderRadius: "30px" }}
            >
              <i
                onClick={() => {
                  handleQuanity(-1);
                }}
                className="bi bi-dash p-1"
                style={{ fontSize: "20px", cursor: "pointer" }}
              ></i>
              <span className="h5 mt-3 px-3">{quantity}</span>
              <i
                onClick={() => {
                  handleQuanity(1);
                }}
                className="bi bi-plus p-1"
                style={{ fontSize: "20px", cursor: "pointer" }}
              ></i>
            </span>
          </div>
          <div className="col-5">
            <img src={data.result?.image} width="82%" alt="No content" style={{borderRadius:"50%",boxShadow:"rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px"}}></img>
            <div className="row pt-4">
              <div className="col-5">
                {isAddingToCart ? (
                  <button
                    disabled
                    className="btn btn-success form-control"
                    style={{
                      border: "none",
                      borderRadius: "1px",
                      backgroundColor: "#ff9f00",
                      fontSize: "18px",
                      fontWeight: 500,
                    }}
                  >
                    <MiniLoader />
                  </button>
                ) : (
                  <button
                    className="btn btn-primary btn-lg form-control"
                    onClick={() => handleAddToCart(data.result?.id)}
                    style={{
                      border: "none",
                      borderRadius: "1px",
                      backgroundColor: "#ff9f00",
                      fontSize: "18px",
                      fontWeight: 500,
                      boxShadow:"rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px"
                    }}
                  >
                    ADD TO CART
                  </button>
                )}
              </div>

              <div className="col-5 ">
                <button
                  className="btn btn-warning btn-lg form-control"
                  onClick={() => navigate(-1)}
                  style={{
                    border: "none",
                    borderRadius: "1px",
                    backgroundColor: "#fb641b",
                    color: "#fff",
                    fontSize: "18px",
                    fontWeight: 500,
                    boxShadow:"rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px"
                  }}
                >
                  BACK TO HOME
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="d-flex justify-content-center"
          style={{ width: "100%" }}
        >
          <MainLoader />
        </div>
      )}
    </div>
  );
}

export default MenuItemDetails;
