import './SubTitleContainer.css';

function SubTitleContainer(props) {
    return (
        <div className="sub-title-container">
            <div className='sub-icon'>
                <img src={props.icon} alt="smth" />
            </div>
            <div className='sub-title'>
                {props.title}
            </div>
            <div className='sub-description'>
                {props.description}
            </div>
        </div>
    );
}

export default SubTitleContainer;
