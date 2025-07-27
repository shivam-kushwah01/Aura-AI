import React, { useState } from 'react';
import './TextToSpeech.css'

const TextToSpeech = () => {
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState('');
  const [error, setError] = useState('');

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
          "api-key": "ap2_3dc2ddc3-0e3d-4a7f-9a4b-b11eef356dad",
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
      
      // Assuming the API returns a URL to the generated audio
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

  return (
    <div className="text-to-speech-container">
      <h2>Text to Speech Converter</h2>
      
      <div className="input-section">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to convert to speech..."
          rows={6}
        />
      </div>

      <div className="controls">
        <button onClick={handleConvert} disabled={isLoading}>
          {isLoading ? 'Converting...' : 'Convert to Speech'}
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {audioUrl && (
        <div className="audio-player">
          <audio controls src={audioUrl}>
            Your browser does not support the audio element.
          </audio>
          <a href={audioUrl} download="speech.mp3" className="download-btn">
            Download Audio
          </a>
        </div>
      )}
    </div>
  );
};

export default TextToSpeech;