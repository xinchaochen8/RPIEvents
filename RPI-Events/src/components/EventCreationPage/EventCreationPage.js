import EventCreationForm from "../Forms/EventCreationForm";
import CenterForm from "../Forms/components/CenterForm";
import Notification from "../Notification/Notification";
import RestrictedAccess from "./RestrictedAccess";
import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../FireBase/AuthContext";

const loggedIn = true;
const role = "organizer";

function EventCreationPage() {
  const {isAuthenticated} = useAuth();

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

  const [role, setRole] = useState("Regular");
  useEffect(() => {
      const fetchRole = async () => {
          try {
              const response = await axios.get("/users/dash");
              console.log(response.data);
              if (response.data.role.Moderator.AllOrganizationsAccess) {
                  setRole("Admin");
              } else if (response.data.role.Organizer.Organizations.length > 0) {
                  setRole("Organizer");
              }
              console.log(`role: ${role}`);
          } catch (error) {
              console.log(`Error from GET /user/dash: ${error.message}`)
          }
      };
      console.log(`isAuthenticated: ${isAuthenticated}`);
      if (isAuthenticated) fetchRole();
  }, [isAuthenticated]);
  
  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = `/dash`; 
    navigate(path);
  };

  const onSubmit = async (formData) => {
    //add event to database using API call
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
      loggedIn
      ?
        (role === "Admin")
        ? 
        <>
          <CenterForm form={<EventCreationForm onSubmit={onSubmit} />} />
          {notification}
        </>
        :
        <RestrictedAccess />
      :
      <Navigate replace to="/login-signup" />
      }
    </>
  );
}

export default EventCreationPage;