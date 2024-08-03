import CardItem from "./CardItem";
import categories from "../../src/assets/data/foodCategory.json";
import foodItems from "../../src/assets/data/foodData2.json";

const img =
  "https://www.licious.in/blog/wp-content/uploads/2022/06/chicken-hyderabadi-biryani-01.jpg";

const Card = () => {
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
                foodItems
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
