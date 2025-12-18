import styles from "./VenueFilters.module.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

/*this file is filter2  */

export default function VenueFilters() {
  return (
    <section className={styles.wrapper}>
      <div className={styles.filters}>
        {/* No of Guests */}
        <div className={styles.selectBox}>
          <select>
            <option>No. of Guests</option>
          </select>
          <KeyboardArrowDownIcon className={styles.icon} />
        </div>

        {/* Venue Type */}
        <div className={styles.selectBox}>
          <select>
            <option>Venue Type</option>
          </select>
          <KeyboardArrowDownIcon className={styles.icon} />
        </div>

        {/* Space Preference */}
        <div className={styles.selectBox}>
          <select>
            <option>Space Preference</option>
          </select>
          <KeyboardArrowDownIcon className={styles.icon} />
        </div>

        {/* Rating */}
        <div className={styles.selectBox}>
          <select>
            <option>Rating</option>
          </select>
          <KeyboardArrowDownIcon className={styles.icon} />
        </div>

        {/* Search */}
        <button className={styles.searchBtn}>Search</button>
      </div>
    </section>
  );
}
