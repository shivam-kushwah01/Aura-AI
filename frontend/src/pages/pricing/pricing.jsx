import React from "react";

export default function Pricing() {
  return (
    <section className="max-w-4xl mx-auto p-6">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-semibold">Pricing</h1>
        <p className="mt-2 text-white-600">
          Aura AI is currently <span className="font-semibold text-green-600">free to use</span> while we’re in open beta.
        </p>
      </header>

      <div className="border border-gray-100 rounded-xl bg-transparent p-8 rounded-2xl shadow-md text-center">
        <h2 className="text-2xl font-bold mb-2">Free Plan</h2>
        <p className="text-white-700 mb-4 text-sm">
          Enjoy all of Aura AI’s core features — text to speech, speech to speech, text to text —
          with no cost during our beta phase.
        </p>
        <p className="text-4xl font-extrabold text-green-600 mb-6">$0</p>

        <ul className="mb-6 text-white-700 text-sm space-y-2">
          <li>✔ Unlimited text to speech conversions</li>
          <li>✔ Speech to speech with multiple voices</li>
          <li>✔ Text translation & rewriting</li>
          <li>✔ API access during beta</li>
        </ul>

        <a
          href="/auth/signup"
          className="inline-flex items-center px-6 py-3 rounded-lg bg-indigo-600 text-white text-sm font-semibold shadow-sm hover:brightness-95"
        >
          Get Started for Free
        </a>
      </div>

      <footer className="mt-10 text-center text-sm text-gray-500">
        Pricing plans for premium tiers will be announced after beta.
      </footer>
    </section>
  );
}
