import styles from "./Reviews.module.css";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

export default function Reviews() {
  return (
    <section className={styles.section}>
      <h2>Reviews</h2>

      <div className={styles.cardsWrapper}>
        {/* Card 1 */}
        <div className={styles.card}>
          <div className={styles.avatar}>
            <button className={styles.arrowBtn}>
              <ChevronLeftIcon fontSize="small" />
            </button>
          </div>

          <h4>LOREM IPSUM</h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
          </p>
        </div>

        {/* Card 2 */}
        <div className={styles.card}>
          <div className={styles.avatar}>
            <button className={styles.arrowBtn}>
              <ChevronRightIcon fontSize="small" />
            </button>
          </div>

          <h4>LOREM IPSUM</h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
          </p>
        </div>
      </div>

      {/* Pagination dots */}
      <div className={styles.dots}>
        <span className={styles.activeDot}></span>
        <span></span>
        <span></span>
      </div>
    </section>
  );
}
