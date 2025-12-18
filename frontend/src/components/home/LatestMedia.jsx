import styles from "./LatestMedia.module.css";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const mediaData = [
  {
    title: "LOREM IPSUM",
    desc: "Lorem ipsum dolor sit amet, consectetur",
  },
  {
    title: "LOREM IPSUM",
    desc: "Lorem ipsum dolor sit amet, consectetur",
  },
  {
    title: "LOREM IPSUM",
    desc: "Lorem ipsum dolor sit amet, consectetur",
  },
  {
    title: "LOREM IPSUM",
    desc: "Lorem ipsum dolor sit amet, consectetur",
  },
];

export default function LatestMedia() {
  return (
    <section className={styles.section}>
      {/* Header */}
      <div className={styles.header}>
        <h2>Latest Media</h2>
        <span>View All (100)</span>
      </div>

      {/* Cards */}
      <div className={styles.grid}>
        {mediaData.map((item, index) => (
          <div key={index} className={styles.card}>
            <div className={styles.imageBox}></div>

            <div className={styles.content}>
              <h4>{item.title}</h4>
              <p>{item.desc}</p>
              <span className={styles.readMore}>Read More</span>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className={styles.pagination}>
        <button className={styles.iconBtn}>
          <ChevronLeftIcon fontSize="small" />
        </button>

        <button >1</button>
        <button>2</button>
        <button>8</button>

        <button className={styles.iconBtn}>
          <ChevronRightIcon fontSize="small" />
        </button>
      </div>
    </section>
  );
}
