import React, { useContext, useState } from "react";
import { Context } from "../store/AppContext";

export const Register = () => {
    const { state, register } = useContext(Context)
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    return (
        <>
            <button type="button" className="btn btn-primary me-2" data-bs-toggle="modal" data-bs-target="#registerModal">
                Registrarse
            </button>
            <div className="modal fade" id="registerModal" tabIndex="-1" aria-labelledby="registerLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="registerLabel">Registro</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={(e) => {
                                e.preventDefault()
                                register({ username, email, password })
                                setUsername('')
                                setPassword('')
                                setEmail('')
                            }}>
                                <div className="mb-3">
                                    <label htmlFor="inputFirstName" className="form-label">Nombre de usuario</label>
                                    <input onChange={(e) => setUsername(e.target.value)} value={username} type="text" className="form-control" id="inputFirstName" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="inputEmail" className="form-label">Email</label>
                                    <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" className="form-control" id="inputEmail" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="inputPassword" className="form-label">Contraseña</label>
                                    <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" className="form-control" id="inputPassword" />
                                </div>
                                <button type="submit" className="btn btn-success">Enviar</button>
                            </form>
                            {state.message && <div><p className="text-success">{state.message}</p> </div>}
                            {state.error && <div><p className="text-danger">{state.error}</p> </div>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}