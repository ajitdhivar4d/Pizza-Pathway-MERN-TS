import { GoNoEntry, GoPlusCircle } from "react-icons/go";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import { useAppDispatch } from "../hooks/hooks";
import {
  removeItem,
  selectItems,
  updateQuantityDec,
  updateQuantityInc,
} from "../redux/reducers/cart";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();

  const items = useSelector(selectItems);

  if (items.length < 1) navigate("/");

  const dispatch = useAppDispatch();

  const handleQuantityInc = (
    name: string,
    option: string,
    quantity: number,
  ) => {
    dispatch(updateQuantityInc({ name, option, quantity }));
  };

  const handleQuantityDec = (
    name: string,
    option: string,
    quantity: number,
  ) => {
    dispatch(updateQuantityDec({ name, option, quantity }));
  };

  return (
    <div className="cart-container">
      <Navbar />
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Option</th>
              <th>Amount</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items &&
              items.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>
                    <button
                      className="quantity-toggle"
                      onClick={() =>
                        handleQuantityInc(item.name, item.option, item.quantity)
                      }
                    >
                      <GoPlusCircle className="quantity-toggle-icon" />
                    </button>

                    {item.quantity}
                    <button
                      className="quantity-toggle"
                      onClick={() =>
                        handleQuantityDec(item.name, item.option, item.quantity)
                      }
                    >
                      <GoNoEntry className="quantity-toggle-icon" />
                    </button>
                  </td>
                  <td>{item.option}</td>
                  <td>{item.amount}</td>
                  <td>
                    <button
                      onClick={() => dispatch(removeItem(item.name))}
                      style={{ cursor: "pointer" }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Cart;
