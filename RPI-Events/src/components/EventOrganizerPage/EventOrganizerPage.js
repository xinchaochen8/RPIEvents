import { useAuth } from "../../FireBase/AuthContext";
import EventOrganizerForm from "../Forms/EventOrganizerForm";
import CenterForm from "../Forms/components/CenterForm";
import Notification from "../Notification/Notification";
import { useState, useEffect } from "react";
import "./EventOrganizerPage.css"
import { Navigate, useNavigate } from "react-router-dom";

function EventOrganizerPage() {
  const {isAuthenticated} = useAuth();
  useEffect(() => {
    if (document.getElementById("dashboard-label"))
        document.getElementById("dashboard-label").classList.remove("highlighted-page");
    if (document.getElementById("register-organizer-label"))
        document.getElementById("register-organizer-label").classList.add("highlighted-page");
    document.getElementById("events-label").classList.remove("highlighted-page");
  }, []);

  const [notification, updateNotification] = useState(<></>);
  const openNotification = ({heading, body, show, success}) => {
    if (document.getElementById("noti")) updateNotification(<></>);
    let noti = (
      <Notification 
        heading={heading} 
        body={body} 
        show={show} 
        success={success}
        updateNotification={updateNotification}
        />
      );
    updateNotification(noti);
  };
  
  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = `/dash`; 
    navigate(path);
  };

  const onSubmit = async (formData) => {
    //send an email or something, this is probably a next steps thing
    // openNotification({
    //   heading: "fail", 
    //   body: "test noti", 
    //   show: true, 
    //   success: false
    // }); // call if api call fails
    
    //redirect to dashboard if successful
    routeChange();
  };

  return (
    <>
      {
      isAuthenticated
      ?
      <>
      <div className="center-form-container">
        <CenterForm form={<EventOrganizerForm onSubmit={onSubmit} />} />
        {notification}

      </div>
        
      </>
      :
      <Navigate replace to="/login-signup" />
      }
    </>
  );
}

export default EventOrganizerPage;