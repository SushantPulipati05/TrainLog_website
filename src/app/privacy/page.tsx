import type { Metadata } from "next";
import LegalPage, { ContactLine } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "What TrainLog collects, why, who helps run it, and how to delete your data.",
  alternates: { canonical: "/privacy" },
};

export default function Privacy() {
  return (
    <LegalPage
      title="Privacy policy"
      intro="TrainLog is a workout log app made by Sushant Pulipati in Pune, India. This page explains what the app collects, why, who helps run it, and how to delete everything. The short version: your data is used to run the app for you, it is never sold, and there are no ads."
    >
      <h2>What TrainLog collects</h2>
      <ul>
        <li>
          <strong>Your account.</strong> Your email address and a sign-in ID. If you sign in with Google, also the
          name on your Google account. Passwords are handled by Google Firebase; TrainLog never sees or stores them.
        </li>
        <li>
          <strong>Your profile.</strong> The details you enter: name, age, sex, height, weight (and your previous
          weight, to show the change), target weight, body fat if you add it, and your weekly workout target.
        </li>
        <li>
          <strong>Your training.</strong> Workouts with their exercises, sets, reps, weights, times and notes; custom
          exercises; saved workouts; and your training plan (split, training days, gym time and reminder settings).
        </li>
        <li>
          <strong>Feedback you send.</strong> The message, its type, your account email, and, unless you untick the
          box, the app version and phone model.
        </li>
        <li>
          <strong>Technical details.</strong> Your phone&apos;s time zone, so workouts land on the right day. If the
          app crashes, a crash report: phone model, Android version, app version, what went wrong, and your sign-in
          ID. The server&apos;s hosting provider may keep standard request logs, such as IP addresses, for a short
          time.
        </li>
      </ul>
      <p>
        TrainLog does not collect your location, contacts, photos or advertising ID, does not show ads, and does not
        use advertising or tracking tools.
      </p>

      <h2>On your phone</h2>
      <p>
        The app keeps a copy of your data on your phone so it opens instantly and works with no signal, along with
        any workout in progress and workouts waiting to upload. Gym reminders are scheduled by your phone. When you
        log out, your cached data and training plan are removed from the phone. The app opts out of Android backups,
        so none of this is copied to Google Drive or to a new phone.
      </p>

      <h2>Why it&apos;s used</h2>
      <ul>
        <li>To run the app: save your workouts, show your history, progress, body map and Up next.</li>
        <li>To keep your data in your account, so it&apos;s there after a reinstall or on a new phone.</li>
        <li>To keep accounts safe: confirming email addresses and limiting abuse.</li>
        <li>To fix crashes and answer your feedback.</li>
      </ul>
      <p>
        Your body measurements and training are personal. They are only used to show you your own stats. They are
        never sold, never shared for advertising, and never used to build a profile of you for anyone else.
      </p>

      <h2>Who helps run TrainLog</h2>
      <p>A few services process data on TrainLog&apos;s behalf, only to provide the app:</p>
      <ul>
        <li>
          <strong>Google Firebase</strong>: sign-in (Authentication) and crash reports (Crashlytics).
        </li>
        <li>
          <strong>Railway</strong>: hosts the server and the database where your account data is stored.
        </li>
        <li>
          <strong>Resend</strong>: delivers your feedback messages to the author&apos;s inbox.
        </li>
      </ul>
      <p>
        These services may store data outside India, including in the United States. Your data is not shared with
        anyone else unless the law requires it.
      </p>

      <h2>How long it&apos;s kept</h2>
      <p>
        Your data is kept for as long as you have an account. When you delete your account, everything you logged is
        removed from the database straight away and your sign-in is deleted from Firebase. Crash reports are kept by
        Firebase for up to 90 days, and copies may remain in the hosting provider&apos;s backups for a short time
        before they&apos;re overwritten.
      </p>

      <h2>Your choices</h2>
      <ul>
        <li>
          <strong>See and change your data</strong> in the app: your profile on the Profile tab, and every workout
          from its own page.
        </li>
        <li>
          <strong>Delete everything</strong> from Profile → Account → Delete account. This can&apos;t be undone.
        </li>
        <li>
          <strong>Get a copy</strong> of your data, or ask anything about it, using the contact details below.
        </li>
        <li>
          <strong>Turn off</strong> gym reminders in Profile → Training plan, and notifications in your phone&apos;s
          settings.
        </li>
      </ul>

      <h2>Keeping it safe</h2>
      <p>
        Everything between the app and the server is encrypted (HTTPS). Every request is checked against your
        sign-in, and each account can only ever reach its own data. No system is perfectly secure, but TrainLog only
        keeps what it needs to work.
      </p>

      <h2>Children</h2>
      <p>
        TrainLog is not meant for children under 13. If you&apos;re under 18, use it only with a parent&apos;s or
        guardian&apos;s permission. If you believe a child has created an account, get in touch and it will be
        deleted.
      </p>

      <h2>Changes</h2>
      <p>
        If this policy changes, the date at the top will change too. Big changes will also be mentioned in the app.
      </p>

      <h2>Contact</h2>
      <ContactLine />
    </LegalPage>
  );
}
