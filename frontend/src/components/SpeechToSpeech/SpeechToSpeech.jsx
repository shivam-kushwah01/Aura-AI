import '../TextToSpeech/TextToSpeech.css'
import { Link001 } from '../btn/btn';

export default function SpeechToSpeech(){
    return(
        <>
        <div className="Container">
            <h2>Speech To Speech </h2><i className="ri-speak-ai-line"></i>
            <p>Convert spoken words into natural audio instantly. 
Transform your speech into different voices or languages effortlessly.  
Adjust tone, pitch, and speed to match your needs.  
Ideal for dubbing, voiceovers, and accessibility tools.  
Save time while maintaining high-quality, clear audio.  
Fast, intuitive, and ready to use anywhere.
</p>
        <Link001 className='clr'>Get Started</Link001>
        </div>
        </>
    );
}