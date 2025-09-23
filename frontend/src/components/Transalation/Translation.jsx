import '../TextToSpeech/TextToSpeech.css'
import { Link001 } from '../btn/btn';

export default function Translation(){
    return(
        <>
        <div className="Container">
        <h2>Translate </h2><i className="ri-translate"></i>
        <p>Transform your text quickly and accurately.  
Supports real-time text processing for instant results.  
Generate summaries, rephrased content, or translations effortlessly.  
Customize tone, style, and format to fit your needs.  
Ideal for writing, editing, and content creation.  
Save time and boost productivity with smart text tools.  
Fast, reliable, and ready to use anytime.
</p>    
        
       <Link001 className='clr'>Get Started</Link001>
        </div>
        </>
    );
}