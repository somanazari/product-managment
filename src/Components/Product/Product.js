import ProductStyles from "./Product.module.css";
import { FaTrashAlt } from "react-icons/fa";

// object distructuring
const Product = ({ product, dicrement, increment, onDelete }) => {
  return (
    <div className={ProductStyles.product}>
      <ul>
        <li>
          <strong>Name:</strong>
          {product.title}
        </li>
        <li>
          <strong>Price:</strong>${product.price}
        </li>
      </ul>

      <div className={ProductStyles.btnBox}>
        <span className={ProductStyles.quantity}>{product.quantity}</span>
        <button
          onClick={dicrement}
          className={`${ProductStyles.btn} ${
            product.quantity > 1
              ? ProductStyles.dicrement
              : ProductStyles.remove
          }`}
        >
          {product.quantity > 1 ? "-" : <FaTrashAlt />}
        </button>
        <button
          onClick={increment}
          className={`${ProductStyles.btn} ${ProductStyles.increment}`}
        >
          +
        </button>
        <button
          className={`${ProductStyles.btn} ${ProductStyles.delete}`}
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Product;
