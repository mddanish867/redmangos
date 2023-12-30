import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { cartItemModel, userModel } from "../../Interfaces";
import { RootState } from "../../Storage/Redux/store";
import {
  emptyUserState,
  setLoggedInUser,
} from "../../Storage/Redux/userAuthSlice";
import { SD_Roles, SD_Status } from "../../Utility/SD";

let logo = require("../../Assets/Images/mango.png");

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const shoppingCartFromStore: cartItemModel[] = useSelector(
    (state: RootState) => state.shoppingCartStore.cartItems ?? []
  );

  const userData: userModel = useSelector(
    (state: RootState) => state.userAuthStore
  );

  // Logout functionality
  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(setLoggedInUser({ ...emptyUserState }));
    navigate("/");
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-warning fixed-top"
      style={{ backgroundColor: "#2874f0", color: "#fff" }}
    >
      <div className="container-fluid">
        <NavLink className="nav-link" aria-current="page" to="/">
          <img src={logo} style={{ height: "40px" }} alt="not found" />
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 w-100">
            <li className="nav-item">
              <NavLink
                className="nav-link text-white"
                aria-current="page"
                to="/"
              >
                Home
              </NavLink>
            </li>
            {userData.role === SD_Roles.ADMIN ? (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle text-white"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Admin Panel
                </a>
                <ul className="dropdown-menu pt-4">
                  <li
                    className="dropdown-item"
                    onClick={() => navigate("menuItem/menuitemlist")}
                    style={{ cursor: "pointer" }}
                  >
                    Menu Item
                  </li>

                  <li
                    className="dropdown-item"
                    onClick={() => navigate("order/myorders")}
                    style={{ cursor: "pointer" }}
                  >
                    My orders
                  </li>

                  <li
                    className="dropdown-item"
                    onClick={() => navigate("order/allorders")}
                    style={{ cursor: "pointer" }}
                  >
                    All orders
                  </li>
                </ul>
              </li>
            ) : (
              <li className="nav-item">
                <NavLink
                  className="nav-link text-white"
                  aria-current="page"
                  to="/order/myorders"
                >
                  Order{" "}
                </NavLink>
              </li>
            )}

            {/* <li className="nav-item">
              <NavLink
                className="nav-link text-white"
                aria-current="page"
                to="/authenticationtest"
              >
                Authentication
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                className="nav-link text-white"
                aria-current="page"
                to="/authenticationtestadmin"
              >
                Authorization
              </NavLink>
            </li> */}

            <li className="nav-item">
              <NavLink
                className="nav-link text-white"
                aria-current="page"
                to="/shoppingCart"
                style={{ position: "relative" }}
              >
                <i className="bi bi-cart">
                  <span
                    className="badge badge-warning"
                    style={{
                      position: "absolute",
                      top: "0px",
                      right: "-10px",
                      display: "block",
                    }}
                  >
                    {userData.id && `${shoppingCartFromStore.length}`}
                  </span>
                </i>
              </NavLink>
            </li>
            <div className="d-flex" style={{ marginLeft: "auto" }}>
              {userData.id && (
                <>
                  <li className="nav-item">
                    <button
                      className="nav-link active text-white"
                      style={{
                        cursor: "pointer",
                        background: "transparent",
                        border: 0,
                      }}
                    >
                      Welcome <b>{userData.fullName}</b>
                    </button>
                  </li>

                  <li className="nav-item pt-1">
                    <button
                      className="btn btn-success btn-outlined rounded-pill text-primary mx-2"
                      style={{
                        border: "none",
                        height: "40px",
                        width: "100px",
                        backgroundColor: "#fff",
                      }}
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </li>
                </>
              )}
              {!userData.id && (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link text-white" to="/register">
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item text-white pt-1">
                    <NavLink
                      className="btn btn-success bg-white btn-outlined rounded-pill text-primary mx-2"
                      to="/login"
                      style={{
                        border: "none",
                        height: "40px",
                        width: "100px",
                      }}
                    >
                      Login
                    </NavLink>
                  </li>
                </>
              )}
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
