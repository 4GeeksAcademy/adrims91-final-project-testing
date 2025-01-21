import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "./pages/home";
import { Navbar } from "./component/Navbar";
import { AppProvider } from "./store/AppContext";
import { ProfileDetails } from "./component/ProfileDetails";
import { CreateEvent } from "./component/CreateEvent";
import { UserForm } from "./component/UserForm";
import { EventDetails } from "./component/EventDetails";
import { SearchbarResults } from "./component/SearchBarResults";

//create your first component
const Layout = () => {

    return (
        <AppProvider>
            <Router>
                <Navbar />
                <Routes>
                    <Route element={<CreateEvent />} path="/events" />
                    <Route element={<Home />} path="/" />
                    <Route element={<ProfileDetails />} path="/profile" />
                    <Route element={<UserForm />} path="/userForm" />
                    <Route element={<EventDetails />} path="/event/:eventId" />
                    <Route element={<SearchbarResults />} path="/searchbarResults" />
                    <Route element={<h1>Not found!</h1>} path="*" />
                </Routes>
            </Router>
        </AppProvider>
    );
};

export default Layout;
