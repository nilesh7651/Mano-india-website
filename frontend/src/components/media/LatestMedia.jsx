import styles from "./LatestMedia.module.css";

const mediaList = Array.from({ length: 12 });

export default function LatestMedia() {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h3>Latest Media</h3>
        <span>View All (100)</span>
      </div>

      <div className={styles.grid}>
        {mediaList.map((_, index) => (
          <div key={index} className={styles.card}>
            <div className={styles.image}></div>

            <div className={styles.content}>
              <h4>LOREM IPSUM</h4>
              <p>Lorem ipsum dolor sit amet, consectetur</p>
              <span className={styles.readMore}>Read More</span>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.pagination}>
        <button>«</button>
        <button >1</button>
        <button>2</button>
        <button>..</button>
        <button>20</button>
        <button>»</button>
      </div>
    </section>
  );
}
