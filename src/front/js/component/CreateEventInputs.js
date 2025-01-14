import React, { useContext, useState } from "react";
import { Context } from "../store/AppContext";

export const CreateEventInputs = () => {

    const { createEvent } = useContext(Context)

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [date, setDate] = useState('')
    const [time, SetTime] = useState('')
    const [location, setLocation] = useState('')
    const [image, setImage] = useState('')
    const [price, setPrice] = useState('')

    return (
        <div className="row g-0">
            <form onSubmit={(e => {
                e.preventDefault()
                createEvent({ title, description, date, time, location, image, price })
            })}>
                <div className="col p-1"><input onChange={(e) => setTitle(e.target.value)} value={title} className="form-control mb-3 p-2" placeholder="Titulo" type="text"></input></div>
                <div className="col p-1"><input onChange={(e) => setDescription(e.target.value)} value={description} className="form-control mb-3 p-2" placeholder="Descripción" type="text"></input></div>
                <div className="col p-1"><input onChange={(e) => setDate(e.target.value)} value={date} className="form-control mb-3 p-2" type="date"></input></div>
                <div className="col p-1"><input onChange={(e) => SetTime(e.target.value)} value={time} className="form-control mb-3 p-2" type="time"></input></div>
                <div className="col p-1"><select onChange={(e) => setLocation(e.target.value)} value={location} className="form-select mb-3 p-2" aria-label="Default select example">
                    <option value="1">Madrid</option>
                    <option value="2">Barcelona</option>
                    <option value="3">Valencia</option>
                    <option value="4">Málaga</option>
                </select></div>
                <div className="col p-1"><input onChange={(e) => setImage(e.target.value)} value={image} className="form-control mb-3 p-2" type="file"></input></div>
                <div className="col"><input onChange={(e) => setPrice(e.target.value)} value={price} placeholder="€€" className="form-control mb-3 p-2 m-auto" type="number"></input></div>
                <input style={{ float: 'right' }} className="btn btn-success" value={'Crear Evento'} type="submit"></input>
            </form>
        </div>
    )
}