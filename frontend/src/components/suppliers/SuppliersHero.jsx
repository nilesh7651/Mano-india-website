import styles from "./SuppliersHero.module.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export default function SuppliersHero() {
  return (
    <section className={styles.hero}>
      <h1>Our Suppliers</h1>

      <div className={styles.searchBar}>
        <div className={styles.selectBox}>
          <select>
            <option>Select Category</option>
          </select>
          <KeyboardArrowDownIcon />
        </div>

        <div className={styles.selectBox}>
          <select>
            <option>Select Location</option>
          </select>
          <KeyboardArrowDownIcon />
        </div>

        <button>Search</button>
      </div>
    </section>
  );
}
