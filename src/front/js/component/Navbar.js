import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Login } from "./Login";
import { Register } from "./Register";
import { Context } from "../store/AppContext";
import { Logout } from "./Logout";
import { CreateEvent } from "./CreateEvent";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
	const { state } = useContext(Context)
	const navigate = useNavigate()

	useEffect(() => {
		if (!localStorage.getItem('token')) {
			navigate('/')
		}
	}, [state.token])
	return (
		<nav className="navbar">
			<div><Link className="navbar-brand ms-2" to={'/'}>Home</Link></div>
			<div>
				{!state.isAuthenticated ? <><Login />
					<Register /></> : <><Link className="btn btn-success" to={'/profile'}>Mi perfil</Link> <CreateEvent /> <Logout /> </>}

			</div>
		</nav>
	);
};
