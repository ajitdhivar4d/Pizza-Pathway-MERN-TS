import { FormEvent, useEffect, useState } from "react";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch } from "../hooks/hooks";
import { useLoginMutation } from "../redux/api/userApiSlice";
import { selectUserInfo, setCredentials } from "../redux/reducers/auth";

interface ErrorResponse {
  status: number;
  data?: {
    message?: string;
  };
}

export interface UserProfile {
  _id: string;
  name: string;
  email: string;
}

export interface UserApiResponse {
  success: boolean;
  user?: UserProfile;
  message: string;
}

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
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
      const res: UserApiResponse = await login({ email, password }).unwrap();
      if (res.success && res.user) {
        dispatch(setCredentials(res.user));
        navigate(redirect);
        toast.success("Logged in successfully");
      } else {
        toast.error(res.message || "Login failed");
      }
    } catch (error: unknown) {
      if (isErrorResponse(error)) {
        const errorMessage = error.data?.message || "Registration failed";
        toast.error(errorMessage);
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  function isErrorResponse(error: unknown): error is ErrorResponse {
    return (
      typeof error === "object" &&
      error !== null &&
      "status" in error &&
      typeof (error as ErrorResponse).status === "number"
    );
  }

  return (
    <div className="login-container">
      <Link to="/" className="go-home-arrow" title="Go Home">
        <FaLongArrowAltLeft />
      </Link>
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
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Submitting..." : "Submit"}
          </button>
          <p>
            New User? <Link to="/signup">Sign up</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
