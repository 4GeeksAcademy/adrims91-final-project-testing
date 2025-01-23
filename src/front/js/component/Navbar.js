import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Login } from "./Login";
import { Register } from "./Register";
import { Context } from "../store/AppContext";
import { Logout } from "./Logout";
import { CreateEvent } from "./CreateEvent";
import { useNavigate } from "react-router-dom";
import { Searchbar } from "./Searchbar";

export const Navbar = () => {
	const { state } = useContext(Context)
	const navigate = useNavigate()

	useEffect(() => {
		if (!localStorage.getItem('token')) {
			navigate('/')
		}
	}, [state.token])

	const renderAuthButtons = () => {
		if (!state.isAuthenticated) {
			return (
				<>
					<div className="mb-1">
						<Login />
					</div>
					<div>
						<Register />
					</div>
				</>
			);
		} else {
			return (
				<>
					<div>
						<Link className="btn btn-primary m-1 button" to={'/profile'}>Mi perfil</Link>
					</div>
					<div className="m-1">
						<CreateEvent />
					</div>
					<div className="m-1">
						<Logout />
					</div>
				</>
			);
		}
	}

	return (
		<nav className="navbar">
			<div className="container-fluid">
				<div>
					<Link className="navbar-brand ms-4" to={'/'}>
						<i className="fa-solid fa-house fa"></i>
					</Link>
				</div>
				<div className="flex-grow-1 d-flex justify-content-center">
					<Searchbar />
				</div>
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"><i className="fa-solid fa-bars text-primary"></i></span>
				</button>
				<div className="collapse navbar-collapse justify-content-end" id="navbarNav">
					<div className="navbar-nav d-flex align-items-end">
						{renderAuthButtons()}
					</div>
				</div>
			</div>
		</nav>
	);
};
