import React from "react";
import { Link } from "react-router-dom";
import { RiGithubLine, RiMailLine, RiLinkedinLine } from "react-icons/ri";

const linkClass = "text-white/70 hover:text-pink-300 transition-colors";

const Footer = () => {
  return (
    <footer className="mt-16 border-t border-white/10 bg-black/40 backdrop-blur-md text-white">
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* About Section */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <img src="/assets/Aura.svg" alt="" className="h-8 w-8 rounded-lg" />
            <h2 className="font-display text-3xl leading-none">Aura AI</h2>
          </div>
          <p className="text-sm leading-relaxed text-white/70">
            Aura AI transforms text, speech, and ideas into seamless experiences.
            Our mission is to make AI accessible, intuitive, and powerful for creators and learners alike.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-widest text-pink-300 mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/features" className={linkClass}>Features</Link></li>
            <li><Link to="/pricing" className={linkClass}>Pricing</Link></li>
            <li><Link to="/faq" className={linkClass}>FAQ</Link></li>
          </ul>
        </div>

        {/* Developer Info */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-widest text-pink-300 mb-4">Developer</h3>
          <p className="text-sm leading-relaxed mb-4 text-white/70">
            Developed by <strong className="text-white">Shivam Kushwah</strong> – building next-gen AI products.
          </p>
          <div className="flex gap-3 text-xl">
            <a href="https://github.com/shivam-kushwah01" target="_blank" rel="noopener noreferrer" aria-label="GitHub"
              className="grid place-items-center h-10 w-10 rounded-full bg-white/10 hover:bg-pink-500 transition-colors">
              <RiGithubLine />
            </a>
            <a href="mailto:shivkushwah0001@gmail.com" aria-label="Email"
              className="grid place-items-center h-10 w-10 rounded-full bg-white/10 hover:bg-pink-500 transition-colors">
              <RiMailLine />
            </a>
            <a href="https://www.linkedin.com/in/shivam-kushwah-b4aa02271" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
              className="grid place-items-center h-10 w-10 rounded-full bg-white/10 hover:bg-pink-500 transition-colors">
              <RiLinkedinLine />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 py-6 text-center text-sm text-white/50">
        &copy; {new Date().getFullYear()} Aura AI. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
