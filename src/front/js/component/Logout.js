import React, { useContext, useEffect } from "react";
import { Context } from "../store/AppContext";

export const Logout = () => {

    const { logout } = useContext(Context)

    return (
        <button onClick={logout} className="btn btn-danger button">
            Cerrar sesión
        </button>
    )
}