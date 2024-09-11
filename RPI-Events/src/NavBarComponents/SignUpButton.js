import './SignUpButton.css';

function SignUpButton(props) {
    return (
        <div className="text-center sign-up-button">
            {props.label}
        </div>
    );
}

export default SignUpButton;
