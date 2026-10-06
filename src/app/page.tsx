import Hero from "@/components/Hero";
import LogTrack from "@/components/LogTrack";
import Analysis from "@/components/Analysis";
import Install from "@/components/Install";
import Footer from "@/components/Footer";
import MotionProvider from "@/components/MotionProvider";
import styles from "./page.module.css";

export default function Home() {
  return (
    <MotionProvider>
      <main>
        {/* The hero stays pinned underneath; everything in .stack slides up over it. */}
        <Hero />
        <div className={styles.stack}>
          <LogTrack />
          <Analysis />
          <Install />
          <Footer />
        </div>
      </main>
    </MotionProvider>
  );
}
