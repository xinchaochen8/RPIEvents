import './Logo.css';
import logoSrc from "../Group 5.png";

function Logo() {
    return (
        <div className="logo">
            <img className="image-fluid clickableLogo" src={logoSrc} alt="Logo" />
        </div>
    );
}

export default Logo;
