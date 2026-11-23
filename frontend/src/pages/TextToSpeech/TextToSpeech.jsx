import React, { useState } from 'react';
import ToolHeader from '../ToolHeader';
import '../tool.css';

const TextToSpeech = () => {
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState('');
  const [error, setError] = useState('');
  const MURF_API_KEY = import.meta.env.VITE_MURF_API_KEY;

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;

  const handleConvert = async () => {
    if (!text.trim()) {
      setError('Please enter some text');
      return;
    }

    setIsLoading(true);
    setError('');
    setAudioUrl('');

    try {
      const response = await fetch('https://api.murf.ai/v1/speech/generate', {
        method: 'POST',
        headers: {
          "api-key":`${MURF_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          text: text,
          voiceId: "en-US-natalie"
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();

      if (data.audioFile) {
        setAudioUrl(data.audioFile);
      } else {
        throw new Error('No audio URL in response');
      }
    } catch (error) {
      console.error('Conversion error:', error);
      setError('Failed to convert text to speech. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Ctrl/Cmd + Enter converts without reaching for the mouse
  const handleKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter' && !isLoading) {
      handleConvert();
    }
  };

  // The audio is hosted on another domain, so the "download" attribute alone
  // is ignored by browsers. Fetch it as a file first; fall back to opening it.
  const handleDownload = async () => {
    try {
      const res = await fetch(audioUrl);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const ext = new URL(audioUrl).pathname.split('.').pop() || 'wav';
      a.download = `aura-speech.${ext}`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      window.open(audioUrl, '_blank', 'noopener');
    }
  };

  const handleClear = () => {
    setText('');
    setAudioUrl('');
    setError('');
  };

  return (
    <div className="tool-page">
      <ToolHeader
        icon="ri-mic-2-ai-line"
        title="Text to Speech"
        description="Type or paste your text and turn it into natural-sounding audio."
      />

      <div className="tool-panel glass">
        <label htmlFor="tts-input" className="tool-label">
          Your text
          <span className="tool-meta">
            {wordCount} {wordCount === 1 ? 'word' : 'words'} · {text.length} characters
          </span>
        </label>
        <textarea
          id="tts-input"
          className="tool-textarea"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter text to convert to speech..."
          rows={7}
          disabled={isLoading}
        />

        <div className="tool-actions">
          <button className="btn-primary" onClick={handleConvert} disabled={isLoading || !text.trim()}>
            {isLoading ? (
              <>
                <span className="spinner" aria-hidden="true"></span> Converting...
              </>
            ) : (
              <>
                <i className="ri-volume-up-line" aria-hidden="true"></i> Convert to Speech
              </>
            )}
          </button>
          <button className="btn-ghost" onClick={handleClear} disabled={isLoading || (!text && !audioUrl)}>
            <i className="ri-delete-bin-line" aria-hidden="true"></i> Clear
          </button>
          <span className="tool-hint">
            Voice: Natalie (US English) · <span className="kbd">Ctrl</span> + <span className="kbd">Enter</span> to convert
          </span>
        </div>

        {error && (
          <div className="tool-error" role="alert">
            <i className="ri-error-warning-line" aria-hidden="true"></i> {error}
          </div>
        )}

        {audioUrl && (
          <div className="tool-result">
            <div className="tool-label">
              <span><i className="ri-checkbox-circle-line" aria-hidden="true"></i> Your audio is ready</span>
            </div>
            <audio controls autoPlay src={audioUrl}>
              Your browser does not support the audio element.
            </audio>
            <button className="btn-primary btn-small" onClick={handleDownload}>
              <i className="ri-download-2-line" aria-hidden="true"></i> Download audio
            </button>
          </div>
        )}
      </div>

      <div className="tool-tips">
        <div className="tool-tip">
          <i className="ri-quill-pen-line" aria-hidden="true"></i>
          <div><strong>Use punctuation</strong>Commas and full stops add natural pauses.</div>
        </div>
        <div className="tool-tip">
          <i className="ri-text-wrap" aria-hidden="true"></i>
          <div><strong>Split long text</strong>Shorter paragraphs convert faster.</div>
        </div>
        <div className="tool-tip">
          <i className="ri-download-cloud-2-line" aria-hidden="true"></i>
          <div><strong>Save your audio</strong>Download the file to use it anywhere.</div>
        </div>
      </div>
    </div>
  );
};

export default TextToSpeech;
