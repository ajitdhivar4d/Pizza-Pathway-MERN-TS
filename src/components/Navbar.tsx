import { useState } from "react";
import { CiLogin } from "react-icons/ci";
import { GiHamburgerMenu } from "react-icons/gi";
import { SiGnuprivacyguard } from "react-icons/si";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectItems } from "../redux/reducers/cart";
import { IoCartSharp } from "react-icons/io5";

const user = false;

const Navbar = () => {
  // const [user, setUser] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const cartCount = useSelector(selectItems);

  const logoutHandler = () => {
    console.log("logged out");
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
            {user && <Link to="/myorder">My Order</Link>}
          </div>
          <ul>
            {user ? (
              <>
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
              </>
            ) : (
              <>
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
              </>
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
            {user ? (
              <>
                <li>
                  <button>
                    <Link to="/login">My Cart</Link>
                  </button>
                </li>
                <li>
                  <button className="logout-btn">
                    <Link to="/signup">Logout</Link>
                  </button>
                </li>
              </>
            ) : (
              <>
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
              </>
            )}
          </ul>
        </div>
      )}
    </section>
  );
};

export default Navbar;
