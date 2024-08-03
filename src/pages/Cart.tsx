import Navbar from "../components/Navbar";

const Cart = () => {
  const deleteHandler = () => {
    console.log("Delete");
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
            <tr>
              <td>1</td>
              <td>Iphone</td>
              <td>2</td>
              <td>pro modal</td>
              <td>45000</td>
              <td>
                <button onClick={deleteHandler}>Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Cart;
