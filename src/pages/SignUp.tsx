import { FormEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  ErrorResponse,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch } from "../hooks/hooks";
import { useRegisterMutation } from "../redux/api/userApiSlice";
import { selectUserInfo, setCredentials } from "../redux/reducers/auth";

const SignUp = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [register] = useRegisterMutation();
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
      const res = await register({ name, email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
      toast.success("User successfully registered");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        const errorResponse = error as ErrorResponse;
        const errorMessage =
          errorResponse.data?.message || "Registration failed";
        toast.error(errorMessage);
      }
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={submitHandler}>
        <h2>Sign Up</h2>
        <div className="input-div">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="input-div">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-div">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="Submit-div">
          <button type="submit">Submit</button>
          <p>
            Already a user? <Link to="/login">Login</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
