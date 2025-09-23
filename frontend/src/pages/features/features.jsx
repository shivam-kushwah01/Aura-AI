// src/pages/Features/Features.jsx
import React from "react";

export default function Features() {
  const features = [
    {
      title: "Text to Speech",
      desc: "Convert any written content into realistic, human-like audio in multiple languages and accents."
    },
    {
      title: "Speech to Speech",
      desc: "Transform spoken words into another voice or language in real time."
    },
    {
      title: "Text to Text",
      desc: "Translate, rewrite, or summarize text instantly with high accuracy."
    },
    {
      title: "API & SDK Integration",
      desc: "Embed Aura AI into your own apps, workflows, or platforms easily."
    }
  ];

  return (
    <section className="max-w-6xl mx-auto p-6">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-semibold">Features</h1>
        <p className="mt-2 text-white-600">
          Explore what Aura AI can do for your communication needs.
        </p>
      </header>

      <div className="grid gap-6 grid-cols-1">
        {features.map((f, idx) => (
          <div
            key={idx}
            className="p-6 border border-gray-100 bg-transparent rounded-2xl shadow-md hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-medium mb-2">{f.title}</h2>
            <p className="text-white-700 text-sm">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
