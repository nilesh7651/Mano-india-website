import styles from "./PopularVenue.module.css";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const venues = [
  { title: "LOREM ISUM RESORT", place: "MALDIVES" },
  { title: "LOREM ISUM RESORT", place: "INDIA" },
  { title: "LOREM ISUM RESORT", place: "ABU DHABI" },
  { title: "LOREM ISUM RESORT", place: "DUBAI" },
];

export default function PopularVenue() {
  return (
    <section className={styles.section}>
      {/* Header */}
      <div className={styles.header}>
        <h2>Popular Venue</h2>
        <span>View All (1000)</span>
      </div>

      {/* Cards */}
      <div className={styles.grid}>
        {venues.map((v, i) => (
          <div key={i} className={styles.card}>
            <div className={styles.imageBox}>
              <span className={styles.explore}>Explore</span>
            </div>

            <p className={styles.title}>{v.title}</p>
            <p className={styles.location}>{v.place}</p>
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
