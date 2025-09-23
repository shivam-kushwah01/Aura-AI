import React, { useState } from 'react';
import './Translation.css';

export default function Translation() {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('es-ES');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const MURF_API_KEY = import.meta.env.VITE_MURF_API_KEY;

  const languages = [
  { code: 'en-US', name: 'English - US & Canada' },
  { code: 'en-UK', name: 'English - UK' },
  { code: 'en-IN', name: 'English - India' },
  { code: 'en-AU', name: 'English - Australia' },
  { code: 'en-SCOTT', name: 'English - Scotland' },
  { code: 'es-MX', name: 'Spanish - Mexico' },
  { code: 'es-ES', name: 'Spanish - Spain' },
  { code: 'fr-FR', name: 'French - France' },
  { code: 'de-DE', name: 'German - Germany' },
  { code: 'it-IT', name: 'Italian - Italy' },
  { code: 'nl-NL', name: 'Dutch - Netherlands' },
  { code: 'pt-BR', name: 'Portuguese - Brazil' },
  { code: 'zh-CN', name: 'Chinese - China' },
  { code: 'ja-JP', name: 'Japanese - Japan' },
  { code: 'ko-KR', name: 'Korean - Korea' },
  { code: 'hi-IN', name: 'Hindi - India' },
  { code: 'ta-IN', name: 'Tamil - India' },
  { code: 'bn-IN', name: 'Bengali - India' },
  { code: 'hr-HR', name: 'Croatian - Croatia' },
  { code: 'sk-SK', name: 'Slovak - Slovakia' },
  { code: 'pl-PL', name: 'Polish - Poland' },
  { code: 'el-GR', name: 'Greek - Greece' }
];

  const translateText = async () => {
    if (!inputText.trim()) {
      setError('Please enter text to translate');
      return;
    }

    setIsLoading(true);
    setError('');
    setTranslatedText('');

    try {
      const response = await fetch('https://api.murf.ai/v1/text/translate', {
        method: 'POST',
        headers: {
          "api-key": `${MURF_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          targetLanguage: targetLanguage,
          texts: [inputText]
        })
      });

      const data = await response.json();
      console.log(data);
      setTranslatedText(data.translations[0].translated_text);
    } catch (err) {
      setError('Translation service unavailable');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="translation-app">
      <h1>Text Translator</h1>
      
      <div className="language-selector">
        <label htmlFor="language">Target Language:</label>
        <select
          id="language"
          value={targetLanguage}
          onChange={(e) => setTargetLanguage(e.target.value)}
          disabled={isLoading}
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </select>
      </div>

      <div className="text-areas">
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter text to translate..."
          disabled={isLoading}
        />
        
        <textarea
          value={translatedText}
          readOnly
          placeholder="Translation will appear here..."
          className="output"
        />
      </div>

      <button 
        onClick={translateText}
        disabled={isLoading || !inputText.trim()}
        className='translation-btn'
      >
        {isLoading ? 'Translating...' : 'Translate'}
      </button>

      {error && <p className="error">{error}</p>}
    </div>
  );
}