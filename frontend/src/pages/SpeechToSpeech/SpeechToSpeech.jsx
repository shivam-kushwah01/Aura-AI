import React from "react";
import { Link } from "react-router-dom";
import ToolHeader from "../ToolHeader";
import "../tool.css";

const planned = [
  { icon: "ri-user-voice-line", title: "Change your voice", text: "Speak once and hear it back in a different voice." },
  { icon: "ri-global-line", title: "Speak in other languages", text: "Turn your speech into another language." },
  { icon: "ri-equalizer-line", title: "Fine-tune the sound", text: "Adjust tone, pitch and speed." },
];

const SpeechToSpeech = () => {
  return (
    <div className="tool-page">
      <ToolHeader
        icon="ri-speak-ai-line"
        title="Speech to Speech"
        description="Transform spoken words into a new voice or language."
      />

      <div className="tool-panel glass" style={{ textAlign: "center", padding: "2.5rem 1.5rem" }}>
        <span className="tool-soon-badge">
          <i className="ri-time-line" aria-hidden="true"></i> Coming soon
        </span>
        <h2 className="font-display" style={{ fontSize: "clamp(1.8rem, 5vw, 2.6rem)", lineHeight: 1.1 }}>
          We're building this feature
        </h2>
        <p style={{ maxWidth: "32rem", margin: "0.75rem auto 0", color: "rgba(255,255,255,0.75)" }}>
          Speech to Speech isn't available yet. In the meantime, you can use our other tools below.
        </p>

        <div className="tool-actions" style={{ justifyContent: "center" }}>
          <Link to="/text-to-speech" className="btn-primary">
            <i className="ri-mic-2-ai-line" aria-hidden="true"></i> Try Text to Speech
          </Link>
          <Link to="/translation" className="btn-ghost">
            <i className="ri-translate" aria-hidden="true"></i> Try Translate
          </Link>
        </div>
      </div>

      <h3 className="tool-label" style={{ marginTop: "2rem", fontSize: "0.95rem" }}>What's planned</h3>
      <div className="tool-tips" style={{ marginTop: "0.5rem" }}>
        {planned.map((item) => (
          <div className="tool-tip" key={item.title}>
            <i className={item.icon} aria-hidden="true"></i>
            <div><strong>{item.title}</strong>{item.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpeechToSpeech;
