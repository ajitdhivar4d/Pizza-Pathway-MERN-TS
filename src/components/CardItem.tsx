import { useState } from "react";
import { useAppDispatch } from "../hooks/hooks";
import { addItem } from "../redux/reducers/cart";
import { toast } from "react-toastify";

export interface Option {
  type: string;
  price: number;
}

export interface CardItemProps {
  img: string;
  name: string;
  options: Option[];
  categoryName: string;
  description: string;
}

const CardItem = ({
  img,
  name,
  options,
  categoryName,
  description,
}: CardItemProps) => {
  const dispatch = useAppDispatch();

  const [qty, setQty] = useState<number>(1);
  const [selectedSize, setSelectedSize] = useState<string>(options[0].type);

  const getPrice = () => {
    return (
      qty *
      Number(options.find((option) => option.type === selectedSize)?.price)
    );
  };

  const addToCartHandler = () => {
    const selectedOption = options.find(
      (option) => option.type === selectedSize,
    );

    if (!selectedOption) {
      console.error("Selected option not found");
      return;
    }
    const newItem = {
      categoryName,
      name,
      img,
      option: selectedOption,
      quantity: qty,
      description,
      amount: getPrice(),
    };
    dispatch(addItem(newItem));
    toast.success("Item added successfully");
  };

  return (
    <div className="card-item">
      <img src={img} alt="image" />
      <h3>{name}</h3>
      <div className="select-container">
        <select value={qty} onChange={(e) => setQty(Number(e.target.value))}>
          {[...Array(5)].map((_, index) => (
            <option key={index + 1} value={index + 1}>
              {index + 1}
            </option>
          ))}
        </select>

        <select
          value={selectedSize}
          onChange={(e) => setSelectedSize(e.target.value)}
        >
          {options.map((option, index) => (
            <option key={index} value={option.type}>
              {option.type}
            </option>
          ))}
        </select>

        <span>${getPrice()}</span>
      </div>
      <button onClick={addToCartHandler}>Add to Card</button>
    </div>
  );
};

export default CardItem;
