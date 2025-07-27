import './App.css'
import Navbar from './components/navbar/navbar';
import MainContainer from './components/MainContainer/MainContainer';
import Login from './pages/login/login';
import Signup from './pages/signup/signup';
import TextToSpeech from './pages/TextToSpeech/TextToSpeech';
import SpeechToSpeech from './pages/SpeechToSpeech/SpeechToSpeech';
import Translation from './pages/Translation/Translation';

import { Route, Routes, Navigate } from "react-router-dom";

function App() {

  return (
    <>
    <Routes>
      <Route path='/login' exact element = { 
      <>
      <Login />
      </>}/>
      <Route path='/signup' exact element = { 
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
      <Route path="/" exact element={
      <>
      <Navbar />
      <MainContainer />
      </>} /> 
    </Routes>
    </>
  )
}

export default App
