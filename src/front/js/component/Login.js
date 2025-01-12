import React, { useContext, useState } from "react";
import { Context } from "../store/AppContext";

export const Login = () => {

    const { login } = useContext(Context)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    return (
        <>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#loginModal">
                Accede
            </button>
            <div className="modal fade" id="loginModal" tabIndex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="loginModalLabel">Accede</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={(e) => {
                                e.preventDefault()
                                login({ username, password })
                                setUsername('')
                                setPassword('')
                            }}>
                                <input onChange={(e) => setUsername(e.target.value)} value={username} className="form-control mb-1" type="text" placeholder="Username"></input>
                                <input onChange={(e) => setPassword(e.target.value)} value={password} className="form-control" type="password" placeholder="Password"></input>
                                <div className="mt-2">
                                    <button type="button" className="btn btn-danger me-2" data-bs-dismiss="modal">Cerrar</button>
                                    <button type="submit" className="btn btn-success">Acceder</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}