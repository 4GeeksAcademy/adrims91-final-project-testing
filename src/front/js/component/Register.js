import React, { useContext, useEffect, useRef, useState } from "react";
import { Context } from "../store/AppContext";

export const Register = () => {
    const { state, register } = useContext(Context)
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const modalRef = useRef(null)

    const openModal = () => {
        modalRef.current.style.display = 'block'
        modalRef.current.classList.add('show')
    }

    const closeModal = () => {
        modalRef.current.style.display = 'none'
        modalRef.current.classList.remove('show')
    }

    useEffect(() => {
        setUsername('')
        setPassword('')
        setEmail('')
        closeModal()
    }, [state.message])

    return (
        <>
            <button onClick={openModal} type="button" className="btn btn-primary me-2">
                Registrarse
            </button>
            <div ref={modalRef} className="modal fade" tabIndex="-1" style={{ display: 'none' }} aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="registerLabel">Registro</h1>
                            <button onClick={closeModal} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={async (e) => {
                                e.preventDefault()
                                await register({ username, email, password })

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