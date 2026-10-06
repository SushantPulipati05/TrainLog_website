import AppIcon from "./AppIcon";
import styles from "./Logo.module.css";

export default function Logo() {
  return (
    <a href="#top" className={styles.logo} aria-label="TrainLog home">
      <AppIcon size={40} />
      <span className={styles.word}>TRAINLOG</span>
    </a>
  );
}
