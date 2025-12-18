import styles from "./Highlight.module.css";

export default function Highlight() {
  return (
    <section className={styles.highlight}>
      {/* Left image placeholder */}
      <div className={styles.imageBox}>
        <span className={styles.imageIcon}>🖼️</span>
      </div>

      {/* Right content */}
      <div className={styles.content}>
        <h3>Lorem ipsum dolor sit amet</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor
        </p>

        <button className={styles.cta}>CTA</button>
      </div>
    </section>
  );
}
