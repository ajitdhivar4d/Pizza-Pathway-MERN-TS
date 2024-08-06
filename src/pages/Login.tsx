import { FormEvent, useEffect, useState } from "react";
import {
  ErrorResponse,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useAppDispatch } from "../hooks/hooks";
import { useSelector } from "react-redux";
import { selectUserInfo, setCredentials } from "../redux/reducers/auth";
import { useLoginMutation } from "../redux/api/userApiSlice";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [login] = useLoginMutation();
  const userInfo = useSelector(selectUserInfo);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
      toast.success("Logged in successfully");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        const errorResponse = error as ErrorResponse;
        const errorMessage = errorResponse.data?.message || "Login failed";
        toast.error(errorMessage);
      }
    }
  };
  return (
    <div className="login-container">
      <form onSubmit={submitHandler}>
        <h2>Login</h2>
        <div className="input-div">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-div">
          <label htmlFor="">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="Submit-div">
          <button type="submit">Submit</button>
          <p>
            New User? <Link to="/signup">Sign up</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
