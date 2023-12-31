import { useSelector } from "react-redux";
import { useGetAllOrderQuery } from "../../Apis/orderApi";
import { RootState } from "../../Storage/Redux/store";
import OrderList from "../../Components/Page/Order/OrderList";
import { MainLoader } from "../../Components/Page/Common";

function MyOrder() {
  const userId = useSelector((state: RootState) => state.userAuthStore.id);
  const { data, isLoading } = useGetAllOrderQuery(userId);
  return (
    <>
      {isLoading && <MainLoader />}
      {!isLoading && (
        <OrderList isLoading={isLoading} orderData={data.result} />
      )}
    </>
  );
}

export default MyOrder;
