import { PORTFOLIO_URL } from "@/lib/site";
import AppIcon from "./AppIcon";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <span className={styles.left}>
          <AppIcon size={28} />© {new Date().getFullYear()} SUSHANT PULIPATI · PUNE
        </span>
        <span className={styles.links}>
          <a href="/privacy" className={styles.link}>
            PRIVACY
          </a>
          <a href="/terms" className={styles.link}>
            TERMS
          </a>
          <a href={PORTFOLIO_URL} className={styles.link}>
            SUSHNT.DEV ↗
          </a>
        </span>
      </div>
    </footer>
  );
}
