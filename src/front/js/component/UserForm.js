import React, { useContext, useState } from "react";
import { Context } from "../store/AppContext";
import { useNavigate } from "react-router-dom";

export const UserForm = () => {

    const { updateUserData } = useContext(Context)
    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [residence, setResidence] = useState('')
    const [phone, setphone] = useState('')
    const [bio, setBio] = useState('')


    const handleUpdateData = async (e) => {
        e.preventDefault()
        const formData = {
            username,
            email,
            password,
            firstName,
            lastName,
            residence,
            phone,
            bio
        }
        await updateUserData(formData)
        setUsername('')
        setEmail('')
        setPassword('')
        setFirstName('')
        setLastName('')
        setResidence('')
        setphone('')
        setBio('')
        navigate('/profile')
    }

    return (
        <>
            <div className="container">
                <form onSubmit={handleUpdateData}>
                    <h1 className="fs-1 text-center">Modifica tu perfil</h1>
                    <div className="input-group flex-nowrap mb-2">
                        <span style={{ width: '100px' }} className="input-group-text" id="addon-wrapping">Usuario</span>
                        <input onChange={(e) => setUsername(e.target.value)} value={username} type="text" className="form-control" aria-label="name" aria-describedby="addon-wrapping" />
                    </div>
                    <div className="input-group flex-nowrap mb-2">
                        <span style={{ width: '100px' }} className="input-group-text" id="addon-wrapping">Contraseña</span>
                        <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" className="form-control" aria-label="name" aria-describedby="addon-wrapping" />
                    </div>
                    <div className="input-group flex-nowrap mb-2">
                        <span style={{ width: '100px' }} className="input-group-text" id="addon-wrapping">Email</span>
                        <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" className="form-control" aria-label="name" aria-describedby="addon-wrapping" />
                    </div>
                    <div className="input-group flex-nowrap mb-2">
                        <span style={{ width: '100px' }} className="input-group-text" id="addon-wrapping">Nombre</span>
                        <input onChange={(e) => setFirstName(e.target.value)} value={firstName} type="text" className="form-control" aria-label="name" aria-describedby="addon-wrapping" />
                    </div>
                    <div className="input-group flex-nowrap mb-2">
                        <span style={{ width: '100px' }} className="input-group-text" id="addon-wrapping">Apellido</span>
                        <input onChange={(e) => setLastName(e.target.value)} value={lastName} type="text" className="form-control" aria-label="lastName" aria-describedby="addon-wrapping" />
                    </div>
                    <div className="input-group flex-nowrap mb-2">
                        <span style={{ width: '100px' }} className="input-group-text" id="addon-wrapping">Dirección</span>
                        <input onChange={(e) => setResidence(e.target.value)} value={residence} type="text" className="form-control" aria-label="address" aria-describedby="addon-wrapping" />
                    </div>
                    <div className="input-group flex-nowrap mb-2">
                        <span style={{ width: '100px' }} className="input-group-text" id="addon-wrapping">Teléfono</span>
                        <input onChange={(e) => setphone(e.target.value)} value={phone} type="text" className="form-control" aria-label="phone" aria-describedby="addon-wrapping" />
                    </div>
                    <div className="input-group flex-nowrap">
                        <textarea onChange={(e) => setBio(e.target.value)} value={bio} type="text" className="form-control" placeholder="Bio" aria-label="bio" aria-describedby="addon-wrapping" />
                    </div>
                    <div className="text-center mt-3">
                        <input className="btn btn-info" value={'Guardar cambios'} type="submit"></input>
                    </div>
                </form>
            </div>
        </>
    )
}