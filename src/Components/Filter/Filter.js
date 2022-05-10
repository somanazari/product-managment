import { useState } from "react";
import { useProductsActions } from "../Providers/ProductProvider";
import Select from "react-select";
import Styles from "./Filter.module.css";
import SelectComponent from "../../Common/Select/SelectComponent";
import Search from "../../Common/Search/Search";

const filterOptions = [
  { value: "", label: "All" },
  { value: "S", label: "S" },
  { value: "M", label: "M" },
  { value: "X", label: "X" },
  { value: "L", label: "L" },
  { value: "XL", label: "XL" },
  { value: "XXL", label: "XXL" },
];

const sortOptions = [
  { value: "highest", label: "highest" },
  { value: "lowest", label: "lowest" },
];

const Filter = () => {
  const dispatch = useProductsActions();
  const [filter, setValue] = useState({ value: "", label: "All" });
  const [sort, setSort] = useState("");

  const filterHandler = (selectedOption) => {
    dispatch({ type: "filter", selectedOption: selectedOption });
    // بعد از انجام عملیات فیلتر هم، مرتب سازی باز هم اعمال شود
    // selectedOption: sort => اون آبجکتی که در استیت ذخیره شده رو به متد دیسپچ بده
    // همون جوری که کاربر مرتب سازی انجام داده متد هارو فیلتر کن
    dispatch({ type: "sort", selectedOption: sort });
    // value must be object, not {object.value} in object
    setValue(selectedOption);
  };

  const sortHandler = (selectedOption) => {
    dispatch({ type: "sort", selectedOption: selectedOption });
    setSort(selectedOption);
  };

  return (
    <div className={Styles.container}>
      <Search className={Styles.search} filter={filter} />
      <div>
        <h2 className={Styles.filterTitle}>filter products</h2>
        <div className={Styles.filterBox}>
          <SelectComponent
            className={Styles.select}
            title="Filter By Size :"
            value={filter}
            onChange={filterHandler}
            options={filterOptions}
          />
        </div>
        <div className={Styles.sortBox}>
          <SelectComponent
            title="Sort By Price :"
            value={sort}
            onChange={sortHandler}
            options={sortOptions}
          />
        </div>
      </div>
    </div>
  );
};

export default Filter;
