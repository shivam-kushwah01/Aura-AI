import { Link } from 'react-router-dom';
import './tool.css';

// Shared header for the tool pages: back link, icon, title and short description
export default function ToolHeader({ icon, title, description }) {
  return (
    <>
      <Link to="/#tools" className="tool-back">
        <i className="ri-arrow-left-line" aria-hidden="true"></i> All tools
      </Link>
      <div className="tool-header">
        <span className="tool-header-icon">
          <i className={icon} aria-hidden="true"></i>
        </span>
        <div>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
      </div>
    </>
  );
}
