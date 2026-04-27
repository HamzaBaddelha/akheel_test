import styles from "@/app/discover/discover.module.css";

export default function SunsetSection() {
  return (
    <div className={styles.sunset}>
      <section className={styles.section} />
      <section className={`${styles.section} ${styles.end}`}>
        <h2>Booking complete</h2>
      </section>
    </div>
  );
}
