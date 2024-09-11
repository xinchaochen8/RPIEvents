import React, { createContext, useState } from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBarContainer from "./NavBarComponents/NavBarContainer";
import HomeContainer from './HomeComponents/HomeContainer';
import EventsPage from "./EventsPageComponents/EventsPage";
import LoginSignupContainer from './components/LoginSignUpPage/LoginSignUpPage';
import DashBoard from './dashBoard/DashBoard';
import EventInfo from './EventInfoComponents/EventInfo'
import Footer from './components/Footer/Footer';
import EventCreationPage from './components/EventCreationPage/EventCreationPage';
import EventOrganizerPage from './components/EventOrganizerPage/EventOrganizerPage';
import { AuthProvider } from './FireBase/AuthContext'; // Import AuthProvider

export const EventContext = createContext();

function App() {
    const [separateEvent, setSeparateEvent] = useState({});
    console.log(separateEvent);

    return (
        <Router>
            <AuthProvider>
                <EventContext.Provider value={{separateEvent, setSeparateEvent}}>
                    <div className="App">
                        <NavBarContainer />
                        <div className='content-wrap'>
                            <Routes>
                                <Route path="/" element={<HomeContainer />} />
                                <Route path="events-page" element={<EventsPage />} />
                                <Route path="create-event" element={<EventCreationPage />} />
                                <Route path="register-organizer" element={<EventOrganizerPage />} />
                                <Route path="login-signup" element={<LoginSignupContainer />} />
                                <Route path="dash" element={<DashBoard />} />
                                <Route path="event-info" element={<EventInfo event={separateEvent} />} />
                            </Routes>
                        </div>
                    <Footer/>
                    </div>
                </EventContext.Provider>
            </AuthProvider>
        </Router>
        // <Router>
        //         <AuthProvider>

        //                     <LoginSignupContainer />
        //         </AuthProvider>

        // </Router>

    );
}

export default App;
