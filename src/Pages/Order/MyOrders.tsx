import { useSelector } from "react-redux";
import { useGetAllOrderQuery } from "../../Apis/orderApi";
import { RootState } from "../../Storage/Redux/store";
import OrderList from "../../Components/Page/Order/OrderList";
import { MainLoader } from "../../Components/Page/Common";

function MyOrder() {
  const userId = useSelector((state: RootState) => state.userAuthStore.id);
  const { data, isLoading } = useGetAllOrderQuery({ userId });
  return (
    <>
      {isLoading && <MainLoader />}
      {!isLoading && (
        <>
          <div className="d-flex align-item-center justify-content-between mx-5 mt-5">
            <h4 className="text-success">My Orders List</h4>
          </div>
          <OrderList
            isLoading={isLoading}
            orderData={data?.apiResponse.result}
          />
        </>
      )}
    </>
  );
}

export default MyOrder;
