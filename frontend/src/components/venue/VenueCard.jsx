import styles from "./VenueCard.module.css";

export default function VenueCard() {
  return (
    <div className={styles.card}>
      <div className={styles.image}>
        <span>Explore</span>
      </div>

      <h4>
        LOREM IPSUM RESORT, <strong>ABU DHABI</strong>
      </h4>

      <p className={styles.rating}>★★★★★ <span>5 (22)</span></p>
      <p className={styles.guests}>Upto 500 Guests</p>
    </div>
  );
}
