import React, { useContext, useEffect } from "react";
import { Context } from "../store/AppContext";
import { Link } from "react-router-dom";

export const ProfileDetails = () => {

    const { state, getUserData } = useContext(Context)

    useEffect(() => {
        getUserData()
    }, [])

    return (
        <>
            <div className="container">
                <h1 className="fs-1 text-center">Perfil</h1>
                <ul className="list-group list-group-flush">
                    <div>
                        <li id="first_name" className="list-group-item mb-2"><span className="text-primary me-3">Usuario: </span> {state.userData.username || 'Sin definir'}</li>
                    </div>
                    <div>
                        <li id="first_name" className="list-group-item mb-2"><span className="text-primary me-3">Email: </span> {state.userData.email || 'Sin definir'}</li>
                    </div>
                    <div>
                        <li id="first_name" className="list-group-item mb-2"><span className="text-primary me-3">Nombre: </span> {state.userData.first_name || 'Sin definir'}</li>
                    </div>
                    <div>
                        <li className="list-group-item mb-2"><span className="text-primary me-3">Apellido: </span>{state.userData.last_name || 'Sin definir'}</li>
                    </div>
                    <div>
                        <li className="list-group-item mb-2"><span className="text-primary me-3">Dirección: </span>{state.userData.residence || 'Sin definir'}</li>
                    </div>
                    <div>
                        <li className="list-group-item mb-2"><span className="text-primary me-3">Teléfono: </span>{state.userData.phone || 'Sin definir'}</li>
                    </div>
                    <div>
                        <li className="list-group-item"><span className="text-primary me-3">Biografía: </span>{state.userData.bio || 'Sin definir'}</li>
                    </div>
                    <div className="text-center mt-3">
                        <Link to={'/userForm'} className="btn btn-warning">Modificar datos</Link>
                    </div>
                </ul>
                {state.message && <div className="text-center"><p className="text-success">Datos actualizados correctamente</p></div>}
            </div>
        </>
    )
}