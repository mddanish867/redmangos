import { orderSummaryProps } from './OrderSummaryProps'
import { cartItemModel } from '../../../Interfaces'

function OrderSummary({data,userInput}:orderSummaryProps) {
  return (
    <div>
      {" "}
      <h3 className="text-success">Order Summary</h3>
      <div className="mt-3">
        <div className="border py-3 px-2">Name : {userInput.name}</div>
        <div className="border py-3 px-2">Email : {userInput.email}</div>
        <div className="border py-3 px-2">Phone : {userInput.phoneNumber}</div>
        <div className="border py-3 px-2">
            {data.cartItems?.map((cartItem:cartItemModel, index:number)=>{
                return(
<div className="d-flex">
              <div className="d-flex w-100 justify-content-between">
                <p>{cartItem.menuItem?.name}</p>
                <p>${cartItem.menuItem?.price} * {cartItem.quantity} =</p>
              </div>
              <p style={{ width: "70px", textAlign: "right" }}>${(cartItem.menuItem?.price ?? 0) * (cartItem.quantity ?? 0)}</p>
            </div>
                )
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
    </div>
  )
}

export default OrderSummary
