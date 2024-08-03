import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const Home = lazy(() => import("./pages/Home"));
const Cart = lazy(() => import("./pages/Cart"));
const Login = lazy(() => import("./pages/Login"));
const MyOrder = lazy(() => import("./pages/MyOrder"));
const SignUp = lazy(() => import("./pages/SignUp"));

const App = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading....</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/myOrder" element={<MyOrder />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
