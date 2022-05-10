import { useState } from "react";
import Styles from "./ProductList.module.css";
import Product from "../Product/Product";
import { useProducts, useProductsActions } from "../Providers/ProductProvider";

const HookProductList = () => {
  const products = useProducts();
  const dispatch = useProductsActions();

  const renderProducts = () => {
    if (products.length === 0) return <h1>there is no products in cart</h1>;
    return (
      <div className={Styles.products}>
        <h1>Products List</h1>
        {products.map((product) => {
          return (
            <Product
              // name={product.name}
              // price={product.price}
              // quantity={product.quantity}
              // به جای سه تای بالایی این پایینی رو مینویسیم
              increment={() => dispatch({ type: "increment", id: product.id })}
              dicrement={() => dispatch({ type: "decrement", id: product.id })}
              product={product}
              key={product.id}
              onDelete={() => dispatch({ type: "remove", id: product.id })}
              change={(e) =>
                dispatch({ type: "edit", id: product.id, event: e })
              }
            />
          );
        })}
      </div>
    );
  };

  return <>{renderProducts()}</>;
};

export default HookProductList;
