import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const SpeechToSpeech = () => {
  // State variables
  const [isRecording, setIsRecording] = useState(false);
  const [convertedAudio, setConvertedAudio] = useState(null);
  const [transcript, setTranscript] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState('en-US-natalie');
  
  // Refs for audio handling
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const audioElementRef = useRef(null);

  // Available Murf.ai voices (sample - you can add more)
  const murfVoices = [
    { id: 'en-US-natalie', name: 'Natalie (US English)' },
    { id: 'en-US-ryan', name: 'Ryan (US English)' },
    { id: 'en-GB-lucy', name: 'Lucy (British English)' },
    { id: 'en-AU-lisa', name: 'Lisa (Australian English)' },
  ];

  // Initialize voices
  useEffect(() => {
    setVoices(murfVoices);
  }, []);

  // Start recording
  const startRecording = async () => {
    try {
      setStatus('Starting microphone...');
      setError('');
      setTranscript('');
      setConvertedAudio(null);
      
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];
      
      mediaRecorderRef.current.ondataavailable = (e) => {
        audioChunksRef.current.push(e.data);
      };
      
      mediaRecorderRef.current.onstop = async () => {
        await processRecording();
      };
      
      mediaRecorderRef.current.start();
      setIsRecording(true);
      setStatus('Recording... Speak now');
    } catch (err) {
      setError(`Microphone error: ${err.message}`);
      setStatus('');
    }
  };

  // Stop recording
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
      setStatus('Processing your speech...');
    }
  };

  // Process the recording
  const processRecording = async () => {
    try {
      // 1. Convert audio to text
      const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
      console.log('before speech to text');
      const text = await speechToText(audioBlob);
      console.log('after speech to text');
      if (!text) throw new Error('No speech recognized');
      
      setTranscript(text);
      setStatus(`Converting to ${voices.find(v => v.id === selectedVoice)?.name || 'AI voice'}...`);
      
      // 2. Convert text to speech with Murf.ai
      const murfAudio = await convertWithMurf(text);
      setConvertedAudio(murfAudio);
      setStatus('Conversion complete!');
    } catch (err) {
      setError(`Conversion failed: ${err.message}`);
      setStatus('');
    }
  };

  // Speech-to-Text using Web Speech API
  const speechToText = (audioBlob) => {
  return new Promise((resolve, reject) => {
    console.log('1. Creating recognition');
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = selectedVoice.split('-').slice(0, 2).join('-');
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    console.log('2. Creating audio element');
    const audioUrl = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioUrl);

    // Timeout after 8 seconds if nothing happens
    const timeout = setTimeout(() => {
      console.warn('5. Recognition timeout');
      recognition.stop();
      audio.pause();
      reject(new Error('No speech detected'));
    }, 8000);

    audio.onplay = () => {
      console.log('3. Audio started playing - starting recognition');
      recognition.start();
    };

    audio.onended = () => {
      console.log('4. Audio finished playing');
      // Give recognition time to process
      setTimeout(() => recognition.stop(), 500);
    };

    recognition.onresult = (event) => {
      console.log('6. Got recognition results');
      clearTimeout(timeout);
      const transcript = event.results[0][0].transcript;
      URL.revokeObjectURL(audioUrl);
      resolve(transcript);
    };

    recognition.onerror = (event) => {
      console.error('7. Recognition error:', event.error);
      clearTimeout(timeout);
      URL.revokeObjectURL(audioUrl);
      reject(new Error(`Recognition failed: ${event.error}`));
    };

    recognition.onend = () => {
      console.log('8. Recognition ended');
      clearTimeout(timeout);
    };

  });
};


  // Murf.ai Text-to-Speech conversion
  const convertWithMurf = async (audioBlob, text) => {
    console.log('entered!!');
  const formData = new FormData();
  formData.append('file', audioBlob, 'recording.wav');
  formData.append('voice_id', selectedVoice);
  formData.append('transcription', text);
  
  try {
    const response = await axios.post(
      'https://api.murf.ai/v1/voice-changer/convert',
      formData,
      {
        headers: {
          'api-key': "ap2_3dc2ddc3-0e3d-4a7f-9a4b-b11eef356dad",
          'Content-Type': 'multipart/form-data'
        },
        responseType: 'blob'
      }
    );
    return URL.createObjectURL(response.data);
  } catch (err) {
    throw new Error('Voice conversion failed');
  }
};

  // Play the converted audio
  const playConvertedAudio = () => {
    if (audioElementRef.current) {
      audioElementRef.current.play();
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Speech-to-Speech with Murf.ai</h2>
      <p style={styles.subtitle}>Record your voice and convert it to an AI voice</p>
      
      {/* Voice Selection */}
      <div style={styles.voiceSelection}>
        <label htmlFor="voice-select" style={styles.label}>Select AI Voice:</label>
        <select
          id="voice-select"
          value={selectedVoice}
          onChange={(e) => setSelectedVoice(e.target.value)}
          style={styles.select}
          disabled={isRecording}
        >
          {voices.map(voice => (
            <option key={voice.id} value={voice.id}>{voice.name}</option>
          ))}
        </select>
      </div>
      
      {/* Controls */}
      <div style={styles.controls}>
        <button 
          onClick={isRecording ? stopRecording : startRecording}
          style={{ 
            ...styles.button,
            ...(isRecording ? styles.stopButton : styles.startButton)
          }}
          disabled={status.includes('Processing')}
        >
          {isRecording ? (
            <>
              <span style={styles.recordingDot}>●</span> Stop Recording
            </>
          ) : (
            'Start Recording'
          )}
        </button>
      </div>
      
      {/* Status and Error Messages */}
      {status && <div style={styles.status}>{status}</div>}
      {error && <div style={styles.error}>{error}</div>}
      
      {/* Transcript Display */}
      {transcript && (
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Your Speech:</h3>
          <div style={styles.transcript}>{transcript}</div>
        </div>
      )}
      
      {/* Converted Audio Player */}
      {convertedAudio && (
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>AI Voice Output:</h3>
          <div style={styles.audioContainer}>
            <audio 
              ref={audioElementRef}
              controls 
              src={convertedAudio}
              style={styles.audioPlayer}
            />
            <button 
               onClick={playConvertedAudio}
               style={styles.playButton}
            >
               Play
            </button>
            <button 
              onClick={() => {
                const a = document.createElement('a');
                a.href = convertedAudio;
                a.download = `murf-ai-voice-${selectedVoice}.mp3`;
                a.click();
              }}
              style={styles.downloadButton}
            >
              Download
            </button>
          </div>
        </div>
      )}
      
      {/* Browser Compatibility Notice */}
      <div style={styles.compatibilityNote}>
        <p><strong>Note:</strong> Works best in Chrome and Edge. Requires microphone access.</p>
      </div>
    </div>
  );
};

// Styles
const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    color: '#333'
  },
  title: {
    color: 'white',
    textAlign: 'center',
    marginBottom: '5px'
  },
  subtitle: {
    textAlign: 'center',
    color: '#7f8c8d',
    marginBottom: '30px'
  },
  voiceSelection: {
    marginBottom: '20px'
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontWeight: 'bold'
  },
  select: {
    width: '100%',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    fontSize: '16px'
  },
  controls: {
    display: 'flex',
    justifyContent: 'center',
    margin: '25px 0'
  },
  button: {
    padding: '12px 24px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'all 0.2s',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  startButton: {
    backgroundColor: '#27ae60',
    color: 'white'
  },
  stopButton: {
    backgroundColor: '#e74c3c',
    color: 'white'
  },
  recordingDot: {
    color: '#fff',
    animation: 'blink 1s infinite',
    fontSize: '20px'
  },
  status: {
    padding: '10px',
    backgroundColor: '#eaf2f8',
    borderRadius: '4px',
    margin: '15px 0',
    textAlign: 'center',
    color: '#2980b9'
  },
  error: {
    padding: '10px',
    backgroundColor: '#fdecea',
    borderRadius: '4px',
    margin: '15px 0',
    color: '#d32f2f',
    textAlign: 'center'
  },
  section: {
    margin: '25px 0',
    padding: '15px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px'
  },
  sectionTitle: {
    marginTop: '0',
    color: '#2c3e50',
    borderBottom: '1px solid #eee',
    paddingBottom: '10px'
  },
  transcript: {
    whiteSpace: 'pre-wrap',
    lineHeight: '1.6'
  },
  audioContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    marginTop: '10px'
  },
  audioPlayer: {
    flex: 1
  },
  downloadButton: {
    padding: '8px 16px',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  compatibilityNote: {
    marginTop: '30px',
    borderRadius: '4px',
    fontSize: '14px',
    textAlign: 'center',
    color: 'yellow'
  }
};

export default SpeechToSpeech;
