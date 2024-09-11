import './EventButton.css';

function EventButton(props) {
    return (
        <div id={props.id} className="text-center event-button">
            {props.label}
        </div>
    );
}

export default EventButton;
