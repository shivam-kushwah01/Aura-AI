import './App.css'
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
import Contact from './pages/contact/contact';
import Pricing from './pages/pricing/pricing';

import { Route, Routes, Navigate } from "react-router-dom";

function App() {

  return (
    <>
    <Routes>
      <Route path='/auth/login' exact element = { 
      <>
      <Login />
      </>}/>
      <Route path='/auth/signup' exact element = { 
      <>
      <Signup />
      </>}/>
      <Route path='/text-to-speech' exact element = { 
      <>
      <TextToSpeech />
      </>}/>
      <Route path='/speech-to-speech' exact element = { 
      <>
      <SpeechToSpeech />
      </>}/>
      <Route path='/translation' exact element = { 
      <>
      <Translation />
      </>}/>
      <Route path='/faq' exact element = { 
      <>
      <AuraAIFaq />
      </>}/>
      <Route path='/features' exact element = { 
      <>
      <Features />
      </>}/>
      <Route path='/contact' exact element = { 
      <>
      <Contact />
      </>}/>
      <Route path='/pricing' exact element = { 
      <>
      <Pricing />
      </>}/>
      <Route path="/" exact element={
      <>
      <Navbar />
      <Skiper58 />
      <MainContainer />
      <Footer />
      </>} /> 
    </Routes>
    </>
  )
}

export default App
