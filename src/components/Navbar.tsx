import { useState } from "react";
import { CiLogin } from "react-icons/ci";
import { GiHamburgerMenu } from "react-icons/gi";
import { SiGnuprivacyguard } from "react-icons/si";
import { Link } from "react-router-dom";

const user = false;

const Navbar = () => {
  // const [user, setUser] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  return (
    <section className="navbar-section">
      <div className="navbar-container">
        <h1>
          <Link to="/">Pizza Pathway</Link>
        </h1>

        <div className="navbar">
          <div>
            <Link to="/">Home</Link>
            {user && <Link to="/">My Order</Link>}
          </div>
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
