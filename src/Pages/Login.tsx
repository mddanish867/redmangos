import React, { useState } from "react";
import { inputHelper } from "../Helper";
import { useLoginUserMutation } from "../Apis/authApi";
import aprResponse from "../Interfaces/apiResponse";
import jwt_decode from "jwt-decode";
import { userModel } from "../Interfaces";
import { useDispatch } from "react-redux";
import { setLoggedInUser } from "../Storage/Redux/userAuthSlice";
import { useNavigate } from "react-router-dom";
import { MainLoader } from "../Components/Page/Common";

function Login() {
  const [loginUser] = useLoginUserMutation();
  const [error, SetError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState({
    userName: "",
    password: "",
  });

  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tempData = inputHelper(e, userInput);
    setUserInput(tempData);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const response: aprResponse = await loginUser({
      userName: userInput.userName,
      password: userInput.password,
    });
    if (response.data) {
      const { token } = response.data.result;
      // decoding the item inside token
      const { fullName, id, email, role }: userModel = jwt_decode(token);
      localStorage.setItem("token", token);
      dispatch(setLoggedInUser({ fullName, id, email, role }));
      navigate("/");
    } else if (response.error) {
      SetError(response.error.data.errorMessage[0]);
    }
    setLoading(false);
  };

  return (
    <div className="container text-center">
      {loading && <MainLoader />}
      <form method="post" onSubmit={handleSubmit}>
        <h3 className="mt-5">Login</h3>
        <div className="mt-5">
          <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Username"
              required
              name="userName"
              value={userInput.userName}
              onChange={handleUserInput}
            />
          </div>

          <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
            <input
              type="password"
              className="form-control"
              placeholder="Enter Password"
              required
              name="password"
              value={userInput.password}
              onChange={handleUserInput}
            />
          </div>
        </div>

        <div className="mt-4">
          {error && <p className="text-danger">{error}</p>}
          <button
            type="submit"
            className="btn btn-lg btn-outlined btn-success"
            style={{
              backgroundColor: "#fb641b",
              border: "none",
              borderRadius: "1px",
              width: "400px",
              boxShadow:"rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px"
            }}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
