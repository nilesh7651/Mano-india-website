import styles from "./VenueGrid.module.css";
import VenueCard from "./VenueCard";

export default function VenueGrid() {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h3>Wedding Venues</h3>
        <span>View All (22)</span>
      </div>

      <div className={styles.grid}>
        {Array(12).fill(0).map((_, index) => (
          <VenueCard key={index} />
        ))}
      </div>
    </section>
  );
}
