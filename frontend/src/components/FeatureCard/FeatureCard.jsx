import '../TextToSpeech/TextToSpeech.css'
import { Link } from 'react-router-dom';

export default function FeatureCard({ to, icon, title, tagline, points, badge }) {
    return (
        <Link to={to} className="Container glass">
            <div className="card-head">
                <span className="card-icon">
                    <i className={icon} aria-hidden="true"></i>
                </span>
                {badge && <span className="card-badge">{badge}</span>}
            </div>

            <h2>{title}</h2>
            <p className="card-tagline">{tagline}</p>

            <ul className="card-points">
                {points.map((point) => (
                    <li key={point}>
                        <i className="ri-check-line" aria-hidden="true"></i>
                        {point}
                    </li>
                ))}
            </ul>

            <span className="clr">
                Get Started <i className="ri-arrow-right-line" aria-hidden="true"></i>
            </span>
        </Link>
    );
}
