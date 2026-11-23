import FeatureCard from '../FeatureCard/FeatureCard';

export default function SpeechToSpeech(){
    return(
        <FeatureCard
            to="/speech-to-speech"
            icon="ri-speak-ai-line"
            title="Speech to Speech"
            tagline="Transform your voice into different voices or languages."
            badge="Coming soon"
            points={[
                'Adjust tone, pitch and speed',
                'Ideal for dubbing and voiceovers',
                'High-quality, clear audio',
            ]}
        />
    );
}
