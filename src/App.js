import React from "react";

import HookProductList from "./Components/ProductList/HookProductList";
import AppStyles from "./App.module.css";
import NavBar from "./Components/nav/navBar";
import Wrapper from "./Components/HOC/Wrapper";
import ProductProvider from "./Components/Providers/ProductProvider";
import Filter from "./Components/Filter/Filter";

const App = () => {
  return (
    <>
      <ProductProvider>
        <NavBar />
        <Filter />
        <HookProductList />
      </ProductProvider>
    </>
  );
};

// use HOC for this Component
export default Wrapper(App, AppStyles.container);
