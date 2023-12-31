import { Route, Routes } from "react-router-dom";
import { Header, Footer } from "../Components/Layout";
import {
  AllOrders,
  Home,
  Login,
  MenuItemDetails,
  MenuItemList,
  MenuItemUpsert,
  MyOrders,
  NotFound,
  OrderConfirmed,
  OrderDetails,
  Payment,
  Register,
  ShoppingCart,
} from "../Pages";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetShoppingCartQuery } from "../Apis/shoppingCartApi";
import { setShoppingCart } from "../Storage/Redux/shoppingCartSlice";
import { userModel } from "../Interfaces";
import jwt_decode from "jwt-decode";
import { setLoggedInUser } from "../Storage/Redux/userAuthSlice";
import AuthenticationTest from "../Pages/AuthenticationTest";
import AccessDenied from "../Pages/AccessDenied";
import AuthenticationTestAdmin from "../Pages/AuthenticationTestAdmin";
import { RootState } from "../Storage/Redux/store";

function App() {
  const dispatch = useDispatch();
  const [skip, setSkip] = useState(true);
  const userData: userModel = useSelector(
    (state: RootState) => state.userAuthStore
  );

  const { data, isLoading } = useGetShoppingCartQuery(userData.id,{skip:skip,});
  
  useEffect(() => {
    if (userData.id) {
      setSkip(false);
    }
  }, [userData]);

  // To Prevent the refresh, after refresh user detail details will not go away
  useEffect(() => {
    const localToken = localStorage.getItem("token");
    if (localToken) {
      const { fullName, id, email, role }: userModel = jwt_decode(localToken);
      dispatch(setLoggedInUser({ fullName, id, email, role }));
    }
  }, []);

  useEffect(() => {
    if (!isLoading && data) {
      dispatch(setShoppingCart(data.result?.cartItems));
    }
  }, [data]);

  return (
    <div>
      <Header />
      <div className="pb-5 pt-5">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route
            path="/menuItemDetails/:menuItemId"
            element={<MenuItemDetails />}
          ></Route>
          <Route path="/shoppingCart" element={<ShoppingCart />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route
            path="/authenticationtest"
            element={<AuthenticationTest />}
          ></Route>
          <Route path="/accessdenied" element={<AccessDenied />}></Route>
          <Route
            path="/authenticationtestadmin"
            element={<AuthenticationTestAdmin />}
          ></Route>
          <Route path="/payment" element={<Payment />}></Route>
          <Route
            path="/order/orderconfirmed/:id"
            element={<OrderConfirmed />}
          ></Route>
          <Route path="/order/myOrders" element={<MyOrders />}></Route>
          <Route
            path="/order/orderDetails/:id"
            element={<OrderDetails />}
          ></Route>
          <Route path="/order/allorders" element={<AllOrders />}></Route>
          <Route
            path="/menuItem/menuitemlist"
            element={<MenuItemList />}
          ></Route>
          <Route
            path="/menuItem/menuItemUpsert/:id"
            element={<MenuItemUpsert />}
          />
          <Route
            path="/menuItem/menuItemUpsert"
            element={<MenuItemUpsert />}
          />
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
