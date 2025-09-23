import React from "react";

export default function Contact() {
  return (
    <section className="max-w-4xl mx-auto p-6">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-semibold">Contact Us</h1>
        <p className="mt-2 text-white-600">
          We'd love to hear from you. Get in touch using the details below or send us a message.
        </p>
      </header>

      {/* Contact Info */}
      <div className="grid gap-6 grid-cols-1 mb-10">
        <div className="border border-gray-100 p-6 bg-transparent rounded-2xl shadow-md">
          <h2 className="text-xl font-medium mb-2">Email</h2>
          <p className="text-white-700 text-sm">support@auraai.com</p>
        </div>

        <div className="border border-gray-100 p-6 bg-transparent rounded-2xl shadow-md">
          <h2 className="text-xl font-medium mb-2">Phone</h2>
          <p className="text-white-700 text-sm">+1 (555) 123-4567</p>
        </div>

        <div className="border border-gray-100 p-6 bg-transparent rounded-2xl shadow-md sm:col-span-2">
          <h2 className="text-xl font-medium mb-2">Address</h2>
          <p className="text-white-700 text-sm">
            123 Aura Street, Indore 400<br />
            Madhya Pradesh, India
          </p>
        </div>
      </div>

      {/* Contact Form */}
      <form className="border border-gray-100 bg-transparent p-6 rounded-2xl shadow-md space-y-4">
        <div>
          <label className="block text-sm font-medium text-white-700">Name</label>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border-none shadow-sm text-sm"
            placeholder="Your name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-white-700">Email</label>
          <input
            type="email"
            className="mt-1 block w-full rounded-md border-none shadow-sm text-sm"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-white-700">Message</label>
          <textarea
            rows="4"
            className="mt-1 block w-full rounded-md border-none shadow-sm text-sm"
            placeholder="Your message..."
          ></textarea>
        </div>
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-semibold shadow-sm hover:brightness-95"
        >
          Send Message
        </button>
      </form>
    </section>
  );
}
