import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/AppContext";
import * as filestack from "filestack-js";

export const CreateEventInputs = ({ closeModal }) => {
    const { state, createEvent } = useContext(Context);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [location, setLocation] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(undefined)

    const client = filestack.init('AVQNdAjjIRHW0xnKKEipvz');

    const handleUpload = async () => {
        const picker = client.picker({
            accept: 'image/*',
            maxFiles: 1,
            onUploadDone: (result) => {
                const file = result.filesUploaded[0];
                setImage(file.url);
            }
        });
        picker.open();
    }


    useEffect(() => {
        closeModal()
    }, [state.message])


    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = {
            title,
            description,
            date,
            time,
            location,
            price,
            image
        };
        try {
            await createEvent(formData)
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
                        placeholder="Titulo (10/20 caracteres)"
                        type="text"
                        minLength={'10'}
                        maxLength={'20'}
                        required
                    />
                </div>
                <div className="col p-1">
                    <input
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                        className="form-control mb-3 p-2"
                        placeholder="Descripción (50/150 caracteres)"
                        type="text"
                        minLength={'50'}
                        maxLength={'150'}
                        required
                    />
                </div>
                <div className="col p-1">
                    <label htmlFor="fecha">Fecha</label>
                    <input
                        onChange={(e) => setDate(e.target.value)}
                        id="fecha"
                        type="date"
                        value={date}
                        className="form-control mb-3 p-2"
                    />
                </div>
                <div className="col p-1">
                    <label htmlFor="hora">Hora</label>
                    <input
                        onChange={(e) => setTime(e.target.value)}
                        id="hora"
                        type="time"
                        value={time}
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
                        <option value="Malaga">Málaga</option>
                        <option value="Almuñecar">Almuñécar</option>
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
                <div className="col">
                    {!image ? <button onClick={handleUpload}
                        className="form-control mb-3 p-2 m-auto"
                        alt="Selecciona una foto para tu evento">Selecciona una foto para tu evento</button> : <div><p className="text-success">Foto subida.</p></div>}

                </div>
                <input
                    style={{ float: 'right' }}
                    className="btn btn-success"
                    value="Crear Evento"
                    type="submit"
                />
                {state.message && <div className='text-center text-success'><p>Evento creado con éxito</p></div>}
                {state.error && <div className='text-center text-danger'><p>Ha ocurrido un error en la creación del evento.</p></div>}
            </form>
        </div>
    );
};
