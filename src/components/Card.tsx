import { useSelector } from "react-redux";
import foodItems from "../../src/assets/data/foodData2.json";
import { useAllProductsQuery } from "../redux/api/foodApiSlice";
import { selectSearch } from "../redux/reducers/misc";
import CardItem from "./CardItem";
import { ApiResponse } from "../types/type";

const Card = () => {
  const search = useSelector(selectSearch);

  const { data, isLoading } = useAllProductsQuery();

  const categories = [
    ...new Set(
      (data as ApiResponse)?.items.map((item) => item.categoryName) || [],
    ),
  ];

  const filteredItems = data?.items.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="card-container">
      {isLoading ? (
        <div>loading...</div>
      ) : (
        categories.map((categoryName, index) => (
          <section key={index}>
            <h2>{categoryName}</h2>
            <hr />
            <br />
            <div className="card-item-container">
              {foodItems &&
                filteredItems
                  ?.filter((item) => item.categoryName == categoryName)
                  .map((item) => (
                    <CardItem
                      key={item.name}
                      img={item.img}
                      name={item.name}
                      options={item.options}
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
