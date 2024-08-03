import { useState } from "react";

interface cardItemProps {
  img: string;
  name: string;
  options: { [key: string]: number | string }[];
}

const CardItem = ({ img, name, options }: cardItemProps) => {
  const sizeOptions = Object.keys(options[0]);

  const [qty, setQty] = useState<number>(1);
  const [size, setSize] = useState<string>(sizeOptions[0]);
  // console.log(size);

  const getPrice = () => {
    return qty * Number(options[0][size]);
  };

  const addToCartHandler = () => {
    console.log("dispatch action to add item to cart");
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
          value={size}
          onChange={(e) => setSize(e.target.value.toString())}
        >
          {sizeOptions.map((option) => (
            <option key={option} value={option}>
              {option}
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
