import { Key } from "react";
import Navbar from "../components/Navbar";
import { useGetAllOrderQuery } from "../redux/api/orderApiSlice";

const MyOrder = () => {
  const { data, error, isLoading } = useGetAllOrderQuery();

  console.log(error);

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error...</div>;

  const orders = data?.orderData?.orderData || [];

  const dateStrings = orders.map(
    (order: { orderDate: any }) => order.orderDate,
  );

  return (
    <div className="myOrder-container">
      <Navbar />
      {dateStrings.map((date: string | any[], i: Key | null | undefined) => (
        <div key={i}>
          <div className="myOrder">
            <p>{date.slice(0, 15)}</p>
            <hr />
            {orders
              .filter(
                (order: { orderDate: string | any[] }) =>
                  order.orderDate === date,
              )
              .map((order: { items: any[] }, i: Key | null | undefined) => (
                <div key={i} className="myorder-dateitems">
                  {order.items.map((item, i) => {
                    return (
                      <div key={i}>
                        <section>
                          <div className="myOrder-item">
                            <img
                              src={item.img}
                              alt={item.name}
                              style={{ width: "100px", height: "100px" }}
                            />
                            <h3>{item.name} </h3>
                            <span>${item.option.price}</span>
                          </div>
                        </section>
                      </div>
                    );
                  })}
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyOrder;
