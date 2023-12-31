import { useSelector } from "react-redux";
import { useGetAllOrderQuery } from "../../Apis/orderApi";
import { RootState } from "../../Storage/Redux/store";
import OrderList from "../../Components/Page/Order/OrderList";
import { MainLoader } from "../../Components/Page/Common";
import withAdminAuth from "../../HOC/withAdminAuth";

function AllOrders() {
  const userId = useSelector((state: RootState) => state.userAuthStore.id);
  const { data, isLoading } = useGetAllOrderQuery("");
  return (
    <>
      {isLoading && <MainLoader />}
      {!isLoading && (
        <OrderList isLoading={isLoading} orderData={data.result} />
      )}
    </>
  );
}

export default withAdminAuth(AllOrders);
