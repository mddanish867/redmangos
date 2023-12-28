import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { cartItemModel, userModel } from "../../../Interfaces";
import { RootState } from "../../../Storage/Redux/store";
import { removeFromCart, updateQuantity,} from "../../../Storage/Redux/shoppingCartSlice";
import { useUpdateShoppingCartMutation } from "../../../Apis/shoppingCartApi";

function CartSummary() {
  const dispatch = useDispatch();
  const [updateShoppingCart] = useUpdateShoppingCartMutation();
  const userData: userModel = useSelector((state: RootState) => state.userAuthStore);
  const shoppingCartFromStore: cartItemModel[] = useSelector(
    (state: RootState) => state.shoppingCartStore.cartItems ?? []
  );

  if (!shoppingCartFromStore) {
    return <div>Shopping cart empty</div>;
  }

  const handleQuantity = (
    updateQuantityBy: number,
    cartItem: cartItemModel
  ) => {
    if (
      (updateQuantityBy === -1 && cartItem.quantity === 1) ||
      updateQuantityBy === 0
    ) {
      // remove the item
      updateShoppingCart({
        menuItemId: cartItem.menuItem?.id,
        updateQuantityBy: 0,
        userId: userData.id,
      });
      dispatch(removeFromCart({ cartItem, quanity: 0 }));
    } else {
      //update the quanity with the new quanity
      updateShoppingCart({
        menuItemId: cartItem.menuItem?.id,
        updateQuantityBy: updateQuantityBy,
        userId: userData.id,
      });
      dispatch(
        updateQuantity({
          cartItem,
          quantity: cartItem.quantity! + updateQuantityBy,
        })
      );
    }
  };
  return (
    <div className="container p-4 m-2" >
      <h4 className="text-center text-success">Cart Summary</h4>
      {shoppingCartFromStore.map((cartItem: cartItemModel, index: number) => (
        <div className="d-flex flex-sm-row flex-column align-items-center custom-card-shadow rounded m-3" style={{boxShadow:"rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px"}}>
          <div className="p-3">
            <img
              src={cartItem.menuItem?.image}
              alt=""
              width={"120px"}
              className="rounded-circle"
            />
          </div>

          <div className="p-2 mx-3" style={{ width: "100%" }}>
            <div className="d-flex justify-content-between align-items-center">
              <h4 style={{ fontWeight: 400 }}>{cartItem.menuItem?.name}</h4>
              <h6>
                ${(cartItem.quantity! * cartItem.menuItem!.price).toFixed(2)}
              </h6>
            </div>
            <div className="flex-fill">
              <h6 className="text-muted">${cartItem.menuItem?.price}</h6>
            </div>
            <div className="d-flex justify-content-between">
              <div
                className="d-flex justify-content-between p-2 mt-2 rounded-pill custom-card-shadow  "
                style={{
                  width: "100px",
                  height: "43px",
                }}
              >
                <span style={{ color: "rgba(22,22,22,.7)" }} role="button">
                  <i
                    className="bi bi-dash-circle"
                    onClick={() => handleQuantity(-1, cartItem)}
                  ></i>
                </span>
                <span>
                  <b>{cartItem.quantity}</b>
                </span>
                <span style={{ color: "rgba(22,22,22,.7)" }} role="button">
                  <i
                    className="bi bi-plus-circle"
                    onClick={() => handleQuantity(1, cartItem)}
                  ></i>
                </span>
              </div>

              <i
                className="bi bi-trash3"
                onClick={() => handleQuantity(0, cartItem)}
                style={{ color: "red", cursor: "pointer" }}
              ></i>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CartSummary;
