import React from "react";
import { RiGithubLine, RiMailLine, RiLinkedinLine } from "react-icons/ri";

const Footer = () => {
  return (
    <footer className="bg-black text-[#640D5F] py-12 mt-10">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* About Section */}
        <div>
          <h2 className="text-xl font-bold mb-4">Aura AI</h2>
          <p className="text-sm leading-relaxed">
            Aura AI transforms text, speech, and ideas into seamless experiences. 
            Our mission is to make AI accessible, intuitive, and powerful for creators and learners alike.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-bold mb-4">Quick Links</h2>
          <ul className="space-y-2 text-sm">
            <li><a href="/features" className="hover:text-white transition">Features</a></li>
            <li><a href="/pricing" className="hover:text-white transition">Pricing</a></li>
            <li><a href="/contact" className="hover:text-white transition">Contact</a></li>
            <li><a href="/faq" className="hover:text-white transition">FAQ</a></li>
          </ul>
        </div>

        {/* Developer Info */}
        <div>
          <h2 className="text-xl font-bold mb-4">Developer</h2>
          <p className="text-sm leading-relaxed mb-4">
            Developed by <strong>Shivam Kushwah</strong> – building next-gen AI products.
          </p>
          <div className="flex gap-4 text-xl">
            <a href="https://github.com/shivam-kushwah01" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
              <RiGithubLine />
            </a>
            <a href="mailto:shivkushwah0001@gmail.com" className="hover:text-white transition">
              <RiMailLine />
            </a>
            <a href="https://www.linkedin.com/in/shivam-kushwah-b4aa02271" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
              <RiLinkedinLine />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#640D5F]/50 mt-10 pt-6 text-center text-sm">
        &copy; {new Date().getFullYear()} Aura AI. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
