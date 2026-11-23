import './MainContainer.css'
import TextToSpeech from '../TextToSpeech/TextToSpeech';
import SpeechToSpeech from '../SpeechToSpeech/SpeechToSpeech';
import Translation from '../Transalation/Translation';

export default function MainContainer(){
    return(
        <section id="tools" className="tools-section">
            <div className="tools-header">
                <h2 className="font-display">Pick a tool to get started</h2>
                <p>No setup needed — choose what you want to do and start in seconds.</p>
            </div>
            <div className="MainContainer">
                <TextToSpeech />
                <SpeechToSpeech />
                <Translation />
            </div>
        </section>
    );
}
