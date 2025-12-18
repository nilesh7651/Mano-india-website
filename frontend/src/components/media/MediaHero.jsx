import styles from "./MediaHero.module.css";

export default function AboutHero() {
  return (
    <section className={styles.hero}>
      <h1 className={styles.heading}>
        We are &lt;Man-O India&gt;
      </h1>

      <div className={styles.subText}>
        <p>We bring</p>
        <p className={styles.bold}>dream weddings</p>
        <p>to life!</p>
      </div>
    </section>
  );
}
