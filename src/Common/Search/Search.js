import { useState } from "react";
import { useProductsActions } from "../../Components/Providers/ProductProvider";
import styles from "./Search.module.css";

const Search = ({ filter }) => {
  const [value, setValue] = useState("");
  const dispatch = useProductsActions();

  const changeHandler = (e) => {
    // همزمان با انجام عملیات جستجو باید فیلتر هم اعمال بشه
    // یعنی زمانی که فیلتر روی محصولات اعمال شده هم باید بتونیم سرچ کنیم
    dispatch({ type: "filter", selectedOption: filter });
    dispatch({ type: "search", event: e.target });
    setValue(e.target.value);
  };

  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        placeholder="Search For ..."
        value={value}
        onChange={changeHandler}
      />
    </div>
  );
};

export default Search;
