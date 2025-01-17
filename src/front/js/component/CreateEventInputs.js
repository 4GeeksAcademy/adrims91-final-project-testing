import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/AppContext";

export const CreateEventInputs = ({ closeModal }) => {
    const { state, createEvent } = useContext(Context);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [location, setLocation] = useState('');
    const [price, setPrice] = useState('');




    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = {}
        formData.title = title
        formData.description = description;
        formData.date = date;
        formData.time = time
        formData.location = location;
        formData.price = price;
        try {
            await createEvent(formData)
            closeModal()
        } catch (error) {
            state.error = error
        }
    };

    return (
        <div className="row g-0">
            <form onSubmit={handleSubmit}>
                <div className="col p-1">
                    <input
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        className="form-control mb-3 p-2"
                        placeholder="Titulo"
                        type="text"
                        required
                    />
                </div>
                <div className="col p-1">
                    <input
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                        className="form-control mb-3 p-2"
                        placeholder="Descripción"
                        type="text"
                        required
                    />
                </div>
                <div className="col p-1">
                    <input
                        onChange={(e) => setDate(e.target.value)}
                        type="date"
                        value={date.toString()}
                        className="form-control mb-3 p-2"

                    />
                </div>
                <div className="col p-1">
                    <input
                        onChange={(e) => setTime(e.target.value)}
                        type="time"
                        value={time.toString()}
                        className="form-control mb-3 p-2"

                    />
                </div>
                <div className="col p-1">
                    <select
                        onChange={(e) => setLocation(e.target.value)}
                        value={location}
                        className="form-select mb-3 p-2"
                        aria-label="Default select example"

                    >
                        <option value="">Selecciona una ubicación</option>
                        <option value="Madrid">Madrid</option>
                        <option value="Barcelona">Barcelona</option>
                        <option value="Valencia">Valencia</option>
                        <option value="Málaga">Málaga</option>
                    </select>
                </div>
                <div className="col">
                    <input
                        onChange={(e) => setPrice(e.target.value)}
                        value={price}
                        placeholder="€€"
                        className="form-control mb-3 p-2 m-auto"
                        type="number"
                    />
                </div>
                <input
                    style={{ float: 'right' }}
                    className="btn btn-success"
                    value="Crear Evento"
                    type="submit"
                />
                {state.message && <div className='text-center text-success'><p>Evento creado con éxito</p></div>}
                {state.error && <div className='text-center text-success'><p>Ha ocurrido un error en la creación del evento.</p></div>}
            </form>

        </div>
    );
};
