import { useState } from "react";

export default function AuraAIFaq() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: "What is Aura AI?",
      a:
        "Aura AI is an advanced communication platform that converts text to speech, speech to speech, and text to text — enabling seamless interaction across formats and devices.",
    },
    {
      q: "How does Aura AI work?",
      a:
        "Aura AI leverages modern neural language models and speech synthesis to transform input instantly. Type, paste, or upload text, or speak directly — Aura AI converts it to your chosen output format with high fidelity.",
    },
    {
      q: "Who can use Aura AI?",
      a:
        "Anyone — creators, businesses, educators, and individuals. Aura AI scales from single-user experiments to enterprise-grade deployments with APIs and SDKs.",
    },
    {
      q: "What languages does Aura AI support?",
      a:
        "Aura AI supports multiple languages and regional accents. Supported languages and voice options are continuously expanded — check the admin console or documentation for the latest list.",
    },
    {
      q: "Is my data secure with Aura AI?",
      a:
        "Yes. We use encryption in transit and at rest, role-based access controls, and follow industry best-practices for data protection and privacy compliance.",
    },
    {
      q: "Do I need to install software?",
      a:
        "No installation is required to start. Aura AI runs in the cloud and works in modern browsers and mobile apps. SDKs are available for embedding into native apps.",
    },
    {
      q: "What are the pricing plans?",
      a:
        "Aura AI offers flexible pricing tiers including a free trial. Plans vary by usage, features, and enterprise needs — visit the Pricing page or contact Sales for a tailored quote.",
    },
    {
      q: "Can I integrate Aura AI into my existing apps?",
      a:
        "Yes — Aura AI provides REST APIs, WebSocket streams for real-time audio, and SDKs to integrate text and voice capabilities into your products and workflows.",
    },
    {
      q: "Does Aura AI offer customer support?",
      a:
        "Absolutely. We offer documentation, a Help Center, email support, and higher-tier plans include dedicated support and SLAs.",
    },
    {
      q: "How do I get started?",
      a:
        "Sign up for a free account on our website, try our quick-start demo, and consult the integration docs to add Aura AI to your product in minutes.",
    },
  ];

  return (
    <section className="max-w-4xl mx-auto p-6 bg-transparent rounded-2xl shadow-md">
      <header className="mb-6">
        <h1 className="text-3xl font-semibold">Frequently Asked Questions</h1>
        <p className="mt-2 text-sm text-white-600">
          Answers about Aura AI's features, security, integration options, and getting started.
        </p>
      </header>

      <div className="space-y-4">
        {faqs.map((item, idx) => (
          <div
            key={idx}
            className="border border-gray-100 rounded-xl overflow-hidden"
            aria-expanded={openIndex === idx}
          >
              <div className="p-5">
                <h3 className="text-lg font-medium">{item.q}</h3>
                <p className="mt-1 text-sm text-white-500 hidden sm:block">
                <p className="text-sm text-white-700">{item.a}</p>
                </p>
              </div>
          </div>
        ))}
      </div>

      <footer className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <a
            href="/auth/signup"
            className="inline-flex items-center px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-semibold shadow-sm hover:brightness-95"
          >
            Create free account
          </a>
        </div>
      </footer>
    </section>
  );
}