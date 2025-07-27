import './MainContainer.css'
import TextToSpeech from '../TextToSpeech/TextToSpeech';
import SpeechToSpeech from '../SpeechToSpeech/SpeechToSpeech';
import Translation from '../Transalation/Translation';
import { Link } from "react-router-dom";

export default function MainContainer(){
    return(
        <div className="MainContainer">
            <Link to="/text-to-speech">
            <TextToSpeech />
            </Link>
            <Link to="/speech-to-speech">
            <SpeechToSpeech />
            </Link>
            <Link to="/translation">
            <Translation />
            </Link>
        </div>
    );
}