import { useSelector } from "react-redux";
import categories from "../../src/assets/data/foodCategory.json";
import foodItems from "../../src/assets/data/foodData2.json";
import CardItem from "./CardItem";
import { selectSearch } from "../redux/reducers/misc";

const Card = () => {
  const search = useSelector(selectSearch);

  const filteredItems = foodItems.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="card-container">
      {categories &&
        categories.map(({ CategoryName }) => (
          <section key={CategoryName}>
            <h2>{CategoryName}</h2>
            <hr />
            <br />
            <div className="card-item-container">
              {foodItems &&
                filteredItems
                  .filter((item) => item.CategoryName == CategoryName)
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
        ))}
    </div>
  );
};

export default Card;
