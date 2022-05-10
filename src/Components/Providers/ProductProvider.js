import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { productsData } from "../../db/Products";
import _ from "lodash";

const ProductContext = createContext();
const ProductContextDispatcher = createContext();

// const initialState = [
//   // اطلاعاتی که از دیتابیس مسان خودشون آیدی دارن
//   { name: "book", price: "30$", id: 1, quantity: 1 },
//   { name: "pen", price: "10$", id: 2, quantity: 2 },
//   { name: "marker", price: "15$", id: 3, quantity: 3 },
// ];

const reducer = (state, action) => {
  switch (action.type) {
    case "increment": {
      // نباید مستقیما استیت رو آپدیت کنیم
      // کمک بگیریم setState برای آپدیت کردن استیت فقط باید از
      // mutate state: مستقیم آپدیت کردن استیت
      // 1.find index
      let index = state.findIndex((item) => item.id == action.id);
      // 2.clone of object
      let product = { ...state[index] };
      // 3.update object
      product.quantity++;
      // 4. clone of state
      let cloneProducts = [...state];
      // .5 update clone state with clone updated object
      cloneProducts[index] = product;
      return cloneProducts;
    }
    case "decrement": {
      let index = state.findIndex((item) => item.id == action.id);
      let product = { ...state[index] };
      product.quantity--;

      let cloneProducts = [...state];
      if (product.quantity == 0) {
        let newProducts = cloneProducts.filter((item) => item.id !== action.id);
        return newProducts;
      } else {
        cloneProducts[index] = product;
        return cloneProducts;
      }
    }
    case "remove": {
      let newProducts = state.filter((item) => item.id !== action.id);
      return newProducts;
    }
    case "filter": {
      const value = action.selectedOption.value;
      if (value === "") {
        return productsData;
      } else {
        const filterdProducts = productsData.filter((product) => {
          // (indexOf) ::>   if it was in array, i give you the index, otherwise (-1)
          // (>= 0)    ::>   if index was Positive, i give you (true), otherwise (false)
          // (return)  ::>   if its true, i return it, otherwise i dont
          return product.availableSizes.indexOf(value) >= 0;
        });

        return filterdProducts;
      }
    }
    case "sort": {
      const value = action.selectedOption.value;
      const products = [...state];
      if (value === "highest") {
        // use lodsh to sort array of object
        return _.orderBy(products, ["price"], ["desc"]);
      } else {
        return _.orderBy(products, ["price"], ["asc"]);
      }
    }
    case "search": {
      let value = action.event.value;
      if (value == "") {
        return state;
      } else {
        let searchedProducts = state.filter((item) => {
          // return item.title.search(action.event.value) >= 0;
          return item.title.toLowerCase().includes(value.toLowerCase());
        });
        return searchedProducts;
      }
    }

    default:
      return state;
  }
};

const ProductProvider = ({ children }) => {
  const [products, dispatch] = useReducer(reducer, productsData);

  return (
    <ProductContext.Provider value={products}>
      <ProductContextDispatcher.Provider value={dispatch}>
        {children}
      </ProductContextDispatcher.Provider>
    </ProductContext.Provider>
  );
};

export default ProductProvider;
export const useProducts = () => useContext(ProductContext);
export const useProductsActions = () => {
  return useContext(ProductContextDispatcher);
  // const priceHandler = () => {
  //   let cloneProducts = [...products];
  //   cloneProducts.map((item, index) => {
  //     let product = { ...cloneProducts[index] };
  //     product.price = product.price.replace("$", " ");
  //     product.price = product.price / 2 + "$";
  //     cloneProducts[index] = product;
  //   });

  //   setProducts(cloneProducts);
  // };

  // const deleteHandler = (id) => {
  //   let newProducts = products.filter((item) => item.id !== id);
  //   setProducts(newProducts);
  // };

  // const incrementHandler = (id) => {
  //   // نباید مستقیما استیت رو آپدیت کنیم
  //   // کمک بگیریم setState برای آپدیت کردن استیت فقط باید از
  //   // mutate state: مستقیم آپدیت کردن استیت
  //   // 1.find index
  //   let index = products.findIndex((item) => item.id == id);
  //   // 2.clone of object
  //   let product = { ...products[index] };
  //   // 3.update object
  //   product.quantity++;
  //   // 4. clone of state
  //   let cloneProducts = [...products];
  //   // .5 update clone state with clone updated object
  //   cloneProducts[index] = product;
  //   // .6 setState
  //   setProducts(cloneProducts);
  // };

  // const dicrementHandler = (id) => {
  //   let index = products.findIndex((item) => item.id == id);
  //   let product = { ...products[index] };
  //   product.quantity--;

  //   let cloneProducts = [...products];
  //   if (product.quantity == 0) {
  //     let newProducts = cloneProducts.filter((item) => item.id !== id);
  //     setProducts(newProducts);
  //   } else {
  //     cloneProducts[index] = product;
  //     setProducts(cloneProducts);
  //   }
  // };

  // const changeHandler = (event, id) => {
  //   let index = products.findIndex((item) => item.id === id);

  //   let product = { ...products[index] };
  //   product.name = event.target.value;

  //   let cloneProducts = [...products];
  //   cloneProducts[index] = product;

  //   setProducts(cloneProducts);
  // };

  // return {
  //   priceHandler,
  //   deleteHandler,
  //   incrementHandler,
  //   dicrementHandler,
  //   changeHandler,
  // };
};
