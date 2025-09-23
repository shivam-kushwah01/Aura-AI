import './TextToSpeech.css'
import { Link001 } from '../btn/btn';

export default function TextToSpeech(){
    return(
        <>
        <div className="Container">
            <h2>Text To Speech </h2><i className="ri-mic-2-ai-line"></i>
            <p>Convert written text into lifelike audio effortlessly.  
Supports real-time playback for instant listening.  
Option to generate pre-made audio files for later use.  
Choose from multiple voices and languages.  
Adjust speed, tone, and pitch to suit your needs.  
Perfect for accessibility, content creation, and learning.  
Fast, simple, and ready to use anywhere.
</p>              
        <Link001 className='clr'>Get Started</Link001>
        </div>
        </>
    );
}