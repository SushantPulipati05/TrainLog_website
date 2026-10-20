import {
  APK_URL,
  APP_DESCRIPTION,
  APP_VERSION,
  AUTHOR,
  AUTHOR_LINKS,
  FAQ,
  MIN_ANDROID,
  PORTFOLIO_URL,
  SITE_URL,
} from "@/lib/site";

/**
 * Structured data (JSON-LD): tells Google - and AI search like ChatGPT,
 * Perplexity and Gemini - in plain facts what TrainLog is, who made it and
 * the answers to common questions, instead of leaving them to guess.
 */
export default function StructuredData() {
  const author = { "@type": "Person", name: AUTHOR, url: PORTFOLIO_URL, sameAs: AUTHOR_LINKS };
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MobileApplication",
        "@id": `${SITE_URL}/#app`,
        name: "TrainLog",
        description: APP_DESCRIPTION,
        url: SITE_URL,
        operatingSystem: MIN_ANDROID,
        applicationCategory: "HealthApplication",
        applicationSubCategory: "Workout tracker",
        softwareVersion: APP_VERSION,
        downloadUrl: `${SITE_URL}${APK_URL}`,
        installUrl: `${SITE_URL}/#install`,
        image: `${SITE_URL}/opengraph-image`,
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        featureList: [
          "Log sets, reps and weight with rest times",
          "Up next: picks your next split day from what has recovered",
          "Body map with 32 muscle parts",
          "Charts for every exercise with personal records",
          "Progress ranking of lifts by 3-month gain",
          "Insights: small wins, form check-ins, lifts not done lately",
          "Consistency heatmap and weekly target",
          "Home-screen widgets",
        ],
        author,
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: "TrainLog",
        url: SITE_URL,
        publisher: author,
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/#faq`,
        mainEntity: FAQ.map(({ q, a }) => ({
          "@type": "Question",
          name: q,
          acceptedAnswer: { "@type": "Answer", text: a },
        })),
      },
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, "\\u003c") }}
    />
  );
}
