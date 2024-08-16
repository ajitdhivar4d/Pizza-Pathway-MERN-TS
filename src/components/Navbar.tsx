import React, { useState } from "react";
import { CiLogin } from "react-icons/ci";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCartSharp } from "react-icons/io5";
import { SiGnuprivacyguard } from "react-icons/si";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch } from "../hooks/hooks";
import { logout, selectUserInfo } from "../redux/reducers/auth";
import { selectItems } from "../redux/reducers/cart";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const cartCount = useSelector(selectItems);
  const userInfo = useSelector(selectUserInfo);

  const logoutHandler = () => {
    dispatch(logout());
    toast.error(" logged out");
  };

  return (
    <section className="navbar-section">
      <div className="navbar-container">
        <h1>
          <Link to="/">Pizza Pathway</Link>
        </h1>

        <div className="navbar">
          <div>
            <Link to="/">Home</Link>
            {userInfo && <Link to="/myorder">My Order</Link>}
          </div>
          <ul>
            {userInfo ? (
              <React.Fragment>
                <li>
                  <button>
                    <Link to="/cart">My Cart</Link>
                    <div className="cart-count">
                      <IoCartSharp size={17} color=" yellow" />
                      <div>{cartCount.length}</div>
                    </div>
                  </button>
                </li>
                <li>
                  <button className="logout-btn" onClick={logoutHandler}>
                    Logout
                  </button>
                </li>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <li>
                  <button>
                    <Link to="/login">Login</Link>
                    <CiLogin />
                  </button>
                </li>
                <li>
                  <button>
                    <Link to="/signup">SignUp</Link>
                    <SiGnuprivacyguard />
                  </button>
                </li>
              </React.Fragment>
            )}
          </ul>
        </div>
        <div
          className="hamburger-icon"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <GiHamburgerMenu />
        </div>
      </div>

      {menuOpen && (
        <div className="menu-open-container">
          <ul>
            {userInfo ? (
              <React.Fragment>
                <li>
                  <button>
                    <Link to="/cart">My Cart</Link>
                  </button>
                </li>
                <li>
                  <button>
                    <Link to="/myorder">My Order</Link>
                  </button>
                </li>
                <li>
                  <button className="logout-btn" onClick={logoutHandler}>
                    <Link to="/login">Logout</Link>
                  </button>
                </li>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <li>
                  <button>
                    <Link to="/login">Login</Link>
                    <CiLogin />
                  </button>
                </li>
                <li>
                  <button>
                    <Link to="/signup">SignUp</Link>
                    <SiGnuprivacyguard />
                  </button>
                </li>
              </React.Fragment>
            )}
          </ul>
        </div>
      )}
    </section>
  );
};

export default Navbar;
