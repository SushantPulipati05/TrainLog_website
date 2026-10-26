import type { Metadata } from "next";
import LegalPage, { ContactLine } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms of use",
  description: "The rules for using TrainLog: your account, your data, training safely, and what TrainLog can and can't promise.",
  alternates: { canonical: "/terms" },
};

export default function Terms() {
  return (
    <LegalPage
      title="Terms of use"
      intro="These terms are the agreement between you and Sushant Pulipati, who makes TrainLog, for using the app and its website. By creating an account or using TrainLog, you agree to them. If you don't agree, please don't use the app."
    >
      <h2>The app</h2>
      <p>
        TrainLog is a free app for logging workouts and following your progress. It&apos;s still being built, and
        while it&apos;s in beta, features may change, move or be removed, and things may sometimes break. Your feedback
        is what shapes it.
      </p>

      <h2>Your account</h2>
      <ul>
        <li>Give accurate details when you sign up, and use an email address you own.</li>
        <li>Keep your sign-in to yourself. You&apos;re responsible for what happens in your account.</li>
        <li>One account per person. Accounts can&apos;t be sold or handed over.</li>
        <li>You must be at least 13. If you&apos;re under 18, use TrainLog only with a parent&apos;s or guardian&apos;s permission.</li>
      </ul>

      <h2>Train safely: this isn&apos;t medical advice</h2>
      <p>
        TrainLog records what you do and shows patterns in it. Up next, recovery shading, bests and every other number
        or suggestion are estimates to help you plan, not advice from a doctor, physiotherapist or coach. Exercise
        carries a risk of injury. Check with a doctor before starting or changing a training program, especially if
        you have a health condition, use good form and safe weights, and stop if something hurts. You train at your
        own risk.
      </p>

      <h2>Your data</h2>
      <p>
        What you log is yours. You let TrainLog store and process it only to run the app for you, as described in the{" "}
        <a href="/privacy">privacy policy</a>. You can delete your account and everything in it at any time from
        Profile → Account → Delete account.
      </p>
      <p>
        If you send feedback or ideas, they can be used to improve TrainLog without any payment or obligation to you.
      </p>

      <h2>Using it fairly</h2>
      <p>Please don&apos;t:</p>
      <ul>
        <li>try to reach other people&apos;s accounts or data, or get around the app&apos;s security;</li>
        <li>overload the service, use scripts or bots, or go around its limits;</li>
        <li>copy, resell or rebrand the app, its design or its exercise library;</li>
        <li>use TrainLog for anything illegal, or to store anything that isn&apos;t your training.</li>
      </ul>
      <p>Accounts that break these rules may be suspended or deleted.</p>

      <h2>What TrainLog can&apos;t promise</h2>
      <p>
        TrainLog is provided as it is, free of charge, without guarantees that it will always be available, free of
        bugs, or that no data will ever be lost. It&apos;s built to save your workouts carefully, including with no
        signal, but please don&apos;t rely on it as the only record of anything critical.
      </p>
      <p>
        As far as the law allows, Sushant Pulipati isn&apos;t responsible for injuries from training, lost data, or
        indirect losses arising from using TrainLog. Nothing here limits rights that the law says can&apos;t be
        limited.
      </p>

      <h2>Ending things</h2>
      <p>
        You can stop using TrainLog and delete your account whenever you like. TrainLog may close or change the
        service; if it shuts down, you&apos;ll be told in advance where possible so you can keep a copy of your data.
      </p>

      <h2>Changes and law</h2>
      <p>
        These terms may change as the app does. The date at the top shows the latest version, and big changes will be
        mentioned in the app. Continuing to use TrainLog after a change means you accept it. These terms are governed
        by the laws of India, and the courts of Pune, Maharashtra handle any disputes.
      </p>

      <h2>Contact</h2>
      <ContactLine />
    </LegalPage>
  );
}
