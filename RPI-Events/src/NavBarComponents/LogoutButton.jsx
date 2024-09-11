import './LogoutButton.css';

function LogoutButton(props) {
    return (
        <div className="text-center log-out-button">
            {props.label}
        </div>
    );
}

export default LogoutButton;
