import React, { useState } from 'react';
import ToolHeader from '../ToolHeader';
import '../tool.css';

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

export default function Translation() {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('es-ES');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const MURF_API_KEY = import.meta.env.VITE_MURF_API_KEY;

  const translateText = async () => {
    if (!inputText.trim()) {
      setError('Please enter text to translate');
      return;
    }

    setIsLoading(true);
    setError('');
    setTranslatedText('');
    setCopied(false);

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
      setTranslatedText(data.translations[0].translated_text);
    } catch (err) {
      setError('Translation service unavailable. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter' && !isLoading) {
      translateText();
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(translatedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError('Could not copy. Please select the text and copy it manually.');
    }
  };

  const handleClear = () => {
    setInputText('');
    setTranslatedText('');
    setError('');
    setCopied(false);
  };

  const targetName = languages.find((l) => l.code === targetLanguage)?.name;

  return (
    <div className="tool-page">
      <ToolHeader
        icon="ri-translate"
        title="Translate"
        description="Write in any language and get an instant translation."
      />

      <div className="tool-panel glass">
        <label htmlFor="language" className="tool-label">Translate to</label>
        <select
          id="language"
          className="tool-select"
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

        <div className="tool-grid-2" style={{ marginTop: '1.25rem' }}>
          <div>
            <label htmlFor="tr-input" className="tool-label">
              Original text
              <span className="tool-meta">{inputText.length} characters</span>
            </label>
            <textarea
              id="tr-input"
              className="tool-textarea"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter text to translate..."
              disabled={isLoading}
            />
          </div>

          <div>
            <div className="tool-label">
              <label htmlFor="tr-output">{targetName}</label>
              <button
                className="btn-ghost btn-small"
                onClick={handleCopy}
                disabled={!translatedText}
              >
                <i className={copied ? 'ri-check-line' : 'ri-file-copy-line'} aria-hidden="true"></i>
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <textarea
              id="tr-output"
              className="tool-textarea"
              value={translatedText}
              readOnly
              placeholder={isLoading ? 'Translating...' : 'Translation will appear here...'}
            />
          </div>
        </div>

        <div className="tool-actions">
          <button
            onClick={translateText}
            disabled={isLoading || !inputText.trim()}
            className="btn-primary"
          >
            {isLoading ? (
              <>
                <span className="spinner" aria-hidden="true"></span> Translating...
              </>
            ) : (
              <>
                <i className="ri-translate-2" aria-hidden="true"></i> Translate
              </>
            )}
          </button>
          <button className="btn-ghost" onClick={handleClear} disabled={isLoading || (!inputText && !translatedText)}>
            <i className="ri-delete-bin-line" aria-hidden="true"></i> Clear
          </button>
          <span className="tool-hint">
            <span className="kbd">Ctrl</span> + <span className="kbd">Enter</span> to translate
          </span>
        </div>

        {error && (
          <div className="tool-error" role="alert">
            <i className="ri-error-warning-line" aria-hidden="true"></i> {error}
          </div>
        )}
      </div>
    </div>
  );
}
