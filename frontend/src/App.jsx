import './App.css'
import { useEffect } from 'react';
import Navbar from './components/navbar/navbar';
import MainContainer from './components/MainContainer/MainContainer';
import Login from './pages/login/login';
import Signup from './pages/signup/signup';
import TextToSpeech from './pages/TextToSpeech/TextToSpeech';
import SpeechToSpeech from './pages/SpeechToSpeech/SpeechToSpeech';
import Translation from './pages/Translation/Translation';
import { Skiper58 } from "./components/intro/intro";
import Footer from './components/footer/footer';
import AuraAIFaq from './pages/faq/faq';
import Features from './pages/features/features';
import Pricing from './pages/pricing/pricing';

import { Route, Routes, Outlet, Link, useLocation } from "react-router-dom";

// Scroll to the top whenever the page changes, or to a section when the URL has a #hash
function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

// Shared layout: navbar + page content + footer on every main page
function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 w-full px-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

// Minimal layout for login / signup with a way back home
function AuthLayout() {
  return (
    <div className="min-h-screen px-4 py-6">
      <Link to="/" className="btn-ghost text-sm">
        <i className="ri-arrow-left-line" aria-hidden="true"></i> Back to home
      </Link>
      <Outlet />
    </div>
  );
}

function Home() {
  return (
    <>
      <Skiper58 />
      <MainContainer />
    </>
  );
}

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path='/auth/login' element={<Login />} />
          <Route path='/auth/signup' element={<Signup />} />
        </Route>

        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path='/text-to-speech' element={<TextToSpeech />} />
          <Route path='/speech-to-speech' element={<SpeechToSpeech />} />
          <Route path='/translation' element={<Translation />} />
          <Route path='/faq' element={<AuraAIFaq />} />
          <Route path='/features' element={<Features />} />
          <Route path='/pricing' element={<Pricing />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
