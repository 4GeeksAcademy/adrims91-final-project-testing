import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "./pages/home";
import { Navbar } from "./component/Navbar";
import { AppProvider } from "./store/AppContext";

//create your first component
const Layout = () => {

    return (
        <AppProvider>
            <Router>
                <Navbar />
                <Routes>
                    <Route element={<Home />} path="/" />
                    <Route element={<h1>Not found!</h1>} path="*" />
                </Routes>
            </Router>
        </AppProvider>
    );
};

export default Layout;
