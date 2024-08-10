import { useEffect } from "react";
import { GoNoEntry, GoPlusCircle } from "react-icons/go";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import { useAppDispatch } from "../hooks/hooks";
import { useAddOrderMutation } from "../redux/api/orderApiSlice";
import {
  clearItemState,
  removeItem,
  selectItems,
  updateQuantityDec,
  updateQuantityInc,
} from "../redux/reducers/cart";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";

export interface CartItem {
  name: string;
  categoryName: string;
  img: string;
  option: Option;
  quantity: number;
  description: string;
  amount: number;
}

export interface Option {
  type: string;
  price: number;
}

export interface Items {
  name: string;
  categoryName: string;
  img: string;
  option: Option;
  quantity: number;
  description: string;
  amount: number;
}

export interface OrderApiRequest {
  email: string;
  date: Date;
  orderData: Items[];
}

export interface UserInfo {
  _id: string;
  name: string;
  email: string;
}

const Cart = () => {
  const navigate = useNavigate();

  const items = useSelector(selectItems) as CartItem[];

  const [addOrder, { isLoading, isError, error }] = useAddOrderMutation();

  useEffect(() => {
    if (items.length < 1) navigate("/");
  }, [items.length, navigate]);

  const dispatch = useAppDispatch();

  const handleQuantityInc = (
    name: string,
    option: Option,
    quantity: number,
  ) => {
    dispatch(updateQuantityInc({ name, option, quantity }));
  };

  const handleQuantityDec = (
    name: string,
    option: Option,
    quantity: number,
  ) => {
    dispatch(updateQuantityDec({ name, option, quantity }));
  };

  const placeOrder = async (items: CartItem[]) => {
    try {
      const orderData: Items[] = items.map((item) => ({
        name: item.name,
        categoryName: item.categoryName,
        img: item.img,
        option: item.option,
        quantity: item.quantity,
        description: item.description,
        amount: item.amount,
      }));

      const date: Date = new Date();
      await addOrder({ date, orderData }).unwrap();
      toast.success("Order placed successfully!");
      navigate("/");
    } catch (err) {
      if (isFetchBaseQueryError(err)) {
        toast.error(
          `Failed to place order. ${
            err.data && typeof err.data.message === "string"
              ? err.data.message
              : "Please try again."
          }`,
        );
      } else if (isSerializedError(err)) {
        toast.error(
          `Failed to place order. ${err.message || "Please try again."}`,
        );
      } else {
        toast.error("Failed to place order. Please try again.");
      }
    }

    localStorage.removeItem("cartItems");
    dispatch(clearItemState());
  };

  const isFetchBaseQueryError = (error: any): error is FetchBaseQueryError => {
    return error && typeof error.status === "number";
  };

  const isSerializedError = (error: any): error is SerializedError => {
    return error && typeof error.message === "string";
  };

  return (
    <div className="cart-container">
      <Navbar />
      {items.length === 0 ? (
        <div className="cart-empty">
          <span>Missing Cart items?</span>
        </div>
      ) : (
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
                items.map((item: CartItem, index: number) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>
                      <button
                        className="quantity-toggle"
                        onClick={() =>
                          handleQuantityInc(
                            item.name,
                            item.option,
                            item.quantity,
                          )
                        }
                      >
                        <GoPlusCircle className="quantity-toggle-icon" />
                      </button>

                      {item.quantity}
                      <button
                        className="quantity-toggle"
                        onClick={() =>
                          handleQuantityDec(
                            item.name,
                            item.option,
                            item.quantity,
                          )
                        }
                      >
                        <GoNoEntry className="quantity-toggle-icon" />
                      </button>
                    </td>
                    <td>
                      {item.option.type} - ${item.option.price}
                    </td>
                    <td>{item.amount * item.quantity}</td>
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
          <button
            onClick={() => placeOrder(items)}
            disabled={isLoading}
            aria-label="Place order"
          >
            {isLoading ? "Placing Order..." : "Place Order"}
          </button>
          {isError && (
            <p>
              Error placing order:
              {isFetchBaseQueryError(error)
                ? error.data && typeof error.data.message === "string"
                  ? error.data.message
                  : "Unknown error"
                : isSerializedError(error)
                ? error.message || "Unknown error"
                : "Unknown error"}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Cart;
