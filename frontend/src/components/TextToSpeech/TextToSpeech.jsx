import FeatureCard from '../FeatureCard/FeatureCard';

export default function TextToSpeech(){
    return(
        <FeatureCard
            to="/text-to-speech"
            icon="ri-mic-2-ai-line"
            title="Text to Speech"
            tagline="Convert written text into lifelike audio effortlessly."
            points={[
                'Real-time playback for instant listening',
                'Download audio files for later use',
                'Perfect for accessibility & content creation',
            ]}
        />
    );
}
