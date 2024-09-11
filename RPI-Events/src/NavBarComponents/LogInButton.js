import './LogInButton.css';

function LogInButton(props) {
    return (
        <div className="text-center log-in-button">
            {props.label}
        </div>
    );
}

export default LogInButton;
