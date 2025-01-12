import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Login } from "./Login";
import { Register } from "./Register";
import { Context } from "../store/AppContext";
import { Logout } from "./Logout";

export const Navbar = () => {
	const { state } = useContext(Context)
	return (
		<nav className="navbar">
			<div><Link className="navbar-brand ms-2" to={'/'}>Home</Link></div>
			<div>
				{!state.isAuthenticated ? <><Login />
					<Register /></> : <Logout />}

			</div>
		</nav>
	);
};
