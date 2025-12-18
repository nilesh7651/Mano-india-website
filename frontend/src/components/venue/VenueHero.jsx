import styles from "./VenueHero.module.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export default function VenueHero() {
  return (
    <section className={styles.hero}>
      <h1>Our Wedding Venues</h1>

      <div className={styles.searchBar}>
        {/* Category */}
        <div className={styles.selectBox}>
          <select>
            <option>Select Category</option>
          </select>
          <KeyboardArrowDownIcon className={styles.icon} />
        </div>

        {/* Location */}
        <div className={styles.selectBox}>
          <select>
            <option>Select Location</option>
          </select>
          <KeyboardArrowDownIcon className={styles.icon} />
        </div>

        {/* Search Button */}
        <button className={styles.searchBtn}>Search</button>
      </div>
    </section>
  );
}
