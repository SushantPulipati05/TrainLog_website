import { FAQ } from "@/lib/site";
import styles from "./Faq.module.css";

/**
 * Cool-down: common questions, answered in plain text. Real, crawlable text
 * on the page is what search engines and AI answers quote from.
 */
export default function Faq() {
  return (
    <section id="faq" className={styles.section} aria-labelledby="faq-title">
      <div className={styles.head}>
        <h2 id="faq-title" className={`display ${styles.title}`}>
          Cool-down: FAQ
        </h2>
        <span className="label">Questions people ask</span>
      </div>
      <div className={styles.list}>
        {FAQ.map(({ q, a }, i) => (
          <details key={q} className={styles.item} open={i === 0}>
            <summary className={styles.q}>
              <span className={styles.n}>{String(i + 1).padStart(2, "0")}</span>
              <h3 className={styles.qText}>{q}</h3>
              <span className={styles.plus} aria-hidden="true" />
            </summary>
            <p className={styles.a}>{a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
