import { useSelector } from "react-redux";
import { useAllProductsQuery } from "../redux/api/foodApiSlice";
import { selectSearch } from "../redux/reducers/misc";
import CardItem from "./CardItem";
import { QueryStatus } from "@reduxjs/toolkit/query";

export interface Option {
  type: string;
  price: number;
}

export interface FoodItemDocument {
  categoryName: string;
  name: string;
  img: string;
  options: Option[];
  description: string;
}

export interface FoodApiResponse {
  FoodItems: FoodItemDocument[];
}

const Card = () => {
  const search = useSelector(selectSearch);

  const { data, status } = useAllProductsQuery();

  const categories = [
    ...new Set(data?.FoodItems.map((item) => item.categoryName) || []),
  ];

  const filteredItems = data?.FoodItems.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="card-container">
      {status === QueryStatus.pending ? (
        <div>loading...</div>
      ) : status === QueryStatus.rejected ? (
        <div>Error loading..</div>
      ) : (
        categories.map((categoryName, index) => (
          <section key={index}>
            <h2>{categoryName}</h2>
            <hr />
            <br />
            <div className="card-item-container">
              {filteredItems &&
                filteredItems
                  ?.filter((item) => item.categoryName === categoryName)
                  .map((item, index) => (
                    <CardItem
                      key={index}
                      categoryName={item.categoryName}
                      name={item.name}
                      img={item.img}
                      options={item.options}
                      description={item.description}
                    />
                  ))}
            </div>
          </section>
        ))
      )}
    </div>
  );
};

export default Card;
