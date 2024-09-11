import './InformationContainer.css';
import TitleContainer from './TitleContainer.js';
import SubTitleContainer from './SubTitleContainer.js';
import BigSignUpButton from './BigSignUpButton.js';
import shareIcon from './shareIcon.png';
import postIcon from './postIcon.png';
import discoverIcon from './discoverIcon.png';

function InformationContainer() {
    return (
        <div className="information-container">
            <TitleContainer />
            <SubTitleContainer title="Post" description="Post and Promote Your Events" icon={postIcon} />
            <SubTitleContainer title="Share" description="Share with Friends" icon={shareIcon} />
            <SubTitleContainer title="Discover" description="Discover events at RPI" icon={discoverIcon} />
            <BigSignUpButton />
        </div>
    );
}

export default InformationContainer;
