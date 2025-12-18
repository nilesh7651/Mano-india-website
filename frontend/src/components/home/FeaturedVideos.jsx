import styles from "./FeaturedVideos.module.css";

const videos = Array(8).fill("Lorem Ipsum");

export default function FeaturedVideos() {
  return (
    <section className={styles.section}>
      {/* Header */}
      <div className={styles.header}>
        <h2>Featured Videos</h2>
        <span>View All (50)</span>
      </div>

      {/* Grid */}
      <div className={styles.grid}>
        {videos.map((title, index) => (
          <div key={index} className={styles.card}>
            <div className={styles.videoBox}></div>
            <p>{title}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
