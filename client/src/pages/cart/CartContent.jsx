import Table from "./Table";
import Order from "./Order";

function CartContent() {
  return (
    <div className="cartLayout">
      <Table />
      <Order />
    </div>
  );
}

export default CartContent;
