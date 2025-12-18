import styles from "./BrowseCategory.module.css";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const categories = [
  "DESTINATION WEDDINGS",
  "HONEYMOON & TRAVEL WEDDING",
  "VIDEOGRAPHERS WEDDING",
  "CELEBRANT",
];

export default function BrowseCategory() {
  return (
    <section className={styles.section}>
      {/* Header */}
      <div className={styles.header}>
        <h2>Browse By Category</h2>
        <span>View All (10)</span>
      </div>

      {/* Cards */}
      <div className={styles.grid}>
        {categories.map((item, index) => (
          <div key={index} className={styles.card}>
            <div className={styles.imageBox}>
              <span className={styles.imageIcon}>🖼️</span>
            </div>
            <p>{item}</p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className={styles.pagination}>
        <button className={styles.iconBtn}>
          <ChevronLeftIcon fontSize="small" />
        </button>

        <button>1</button>
        <button>2</button>
        <button>3</button>

        <button className={styles.iconBtn}>
          <ChevronRightIcon fontSize="small" />
        </button>
      </div>
    </section>
  );
}
