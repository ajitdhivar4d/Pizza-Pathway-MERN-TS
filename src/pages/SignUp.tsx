import { useState } from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const submitHandler = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    console.log("Submit Handler");
    console.log("name", name);
    console.log("email", email);
    console.log("password", password);
  };
  return (
    <div className="login-container">
      <form action="">
        <h2>Sign Up</h2>
        <div className="input-div">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
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
          <button type="submit" onClick={submitHandler}>
            Submit
          </button>
          <p>
            Already a user? <Link to="/login">Login</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
