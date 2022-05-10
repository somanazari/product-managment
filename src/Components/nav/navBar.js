import { FaShoppingCart } from "react-icons/fa";
import { useProducts } from "../Providers/ProductProvider";
import Styles from "./Nav.module.css";

// object distructuring
const NavBar = () => {
  const products = useProducts();

  return (
    <nav className={Styles.navBar}>
      <h1>SHOPPING APP</h1>
      <span className={Styles.cartIcon}>
        <FaShoppingCart />
        <span className={products.length > 0 ? Styles.count : Styles.noneCount}>
          {products.length}
        </span>
      </span>
    </nav>
  );
};

export default NavBar;
