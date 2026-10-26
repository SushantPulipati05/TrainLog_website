import type { ReactNode } from "react";
import { CONTACT_EMAIL, LEGAL_UPDATED } from "@/lib/site";
import AppIcon from "./AppIcon";
import Footer from "./Footer";
import styles from "./LegalPage.module.css";

/** The shared frame for /privacy and /terms: logo back home, title, date, text. */
export default function LegalPage({ title, intro, children }: { title: string; intro: string; children: ReactNode }) {
  return (
    <>
      <main className={styles.page}>
        <a href="/" className={styles.home} aria-label="TrainLog home">
          <AppIcon size={32} />
          <span>TRAINLOG</span>
        </a>
        <p className="label">Last updated {LEGAL_UPDATED}</p>
        <h1 className={`display ${styles.title}`}>{title}</h1>
        <p className={styles.intro}>{intro}</p>
        <div className={styles.body}>{children}</div>
      </main>
      <Footer />
    </>
  );
}

/** How to reach the author: in-app feedback, plus email when one is set. */
export function ContactLine() {
  return (
    <p>
      Use <strong>Profile → Send feedback</strong> in the app
      {CONTACT_EMAIL ? (
        <>
          , or email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        </>
      ) : null}
      . I read everything and reply within a few days.
    </p>
  );
}
