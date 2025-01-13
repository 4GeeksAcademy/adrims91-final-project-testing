import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "./pages/home";
import { Navbar } from "./component/Navbar";
import { AppProvider } from "./store/AppContext";
import { Profile } from "./component/Profile";
import { CreateEvent } from "./component/CreateEvent";

//create your first component
const Layout = () => {

    return (
        <AppProvider>
            <Router>
                <Navbar />
                <Routes>
                    <Route element={<CreateEvent />} path="/events" />
                    <Route element={<Home />} path="/" />
                    <Route element={<Profile />} path="/profile" />
                    <Route element={<h1>Not found!</h1>} path="*" />
                </Routes>
            </Router>
        </AppProvider>
    );
};

export default Layout;
