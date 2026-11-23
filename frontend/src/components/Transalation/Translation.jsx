import FeatureCard from '../FeatureCard/FeatureCard';

export default function Translation(){
    return(
        <FeatureCard
            to="/translation"
            icon="ri-translate"
            title="Translate"
            tagline="Translate your text quickly and accurately."
            points={[
                'Instant results in many languages',
                'Great for writing, editing & learning',
                'Fast, reliable and ready anytime',
            ]}
        />
    );
}
