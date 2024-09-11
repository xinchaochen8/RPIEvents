import { Container, Row, Tabs, Tab, TabContainer } from 'react-bootstrap';
import './EventTabs.css';

// https://www.youtube.com/watch?v=kN7_M4wjDhE -> followed this tutorial to make it
function EventsTabs({allEventsPage, userFeedPage}) {
  const handleTabSelect = (key) => {
    if (key === 'user-feed')
      document.getElementById("tab-title").innerText = "User Feed";
    else
      document.getElementById("tab-title").innerText = "All Events";
  };

  return (
    <Container fluid>
      <Row>
        <Tabs className="tab-container-adjustments" defaultActiveKey="all-events" variant="underline" onSelect={handleTabSelect} >
          <Tab tabClassName="tab-adjustments" eventKey="all-events" title="All Events">
            {allEventsPage}
          </Tab>
          <Tab tabClassName="tab-adjustments" eventKey="user-feed" title="User Feed">
            {userFeedPage}
          </Tab>
        </Tabs>
      </Row>
    </Container>
  );
}

export default EventsTabs;