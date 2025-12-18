import styles from "./AboutHero.module.css";

export default function AboutHero() {
  return (
    <section className={styles.hero}>
      <div className="appContainer">
        <h1>We are &lt;Man-O India&gt;</h1>

        <p className={styles.subText}>
          We bring <br />
          <strong>dream weddings</strong> <br />
          to life!
        </p>
      </div>
    </section>
  );
}
