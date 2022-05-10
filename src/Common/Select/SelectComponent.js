import Styles from "./select.module.css";
import Select from "react-select";

// Pass All Objects In Props With ((rest operator))
// props => title, value, onChange, options
//       ----> ({title, ...rest})
//       ----> ...rest => value, onChange, options
const SelectComponent = ({ title, ...rest }) => {
  return (
    <div className={Styles.selectContainer}>
      <span>{title}</span>
      <Select {...rest} className={Styles.select} />
    </div>
  );
};

export default SelectComponent;
