import React, { useContext, useEffect } from "react";
import { Context } from "../store/AppContext";
import '../../styles/cards.css';
import { Link } from "react-router-dom";


export const Cards = () => {
    const { state, getEvents, deleteEvent } = useContext(Context);


    useEffect(() => {
        getEvents();
    }, [state.userData, state.message]);



    return (
        <div className="container mt-5 mb-5 text-center fs-3">
            {state.events.length > 0 && <h2 className="mb-3">Eventos Disponibles</h2>}
            <div className="row justify-content-center row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {state.events.length !== 0 ? state.events.map(event => (
                    <div key={event.id} className="col">
                        <div className="card shadow-sm border-light rounded">
                            <p className="delete-btn fs-3" onClick={() => deleteEvent(event.id)}>x</p>
                            <img src={event.image} className="card-img-top" alt="Imagen" />
                            <div className="card-body">
                                <h5 className="card-title">{event.title}</h5>
                                <Link to={`/event/${event.id}`} className="btn btn-primary">Ver detalles del evento</Link>
                            </div>
                        </div>
                    </div>
                )) : (
                    <div className="col-12 m-auto mt-5 p-5 w-100">
                        <p>No hay eventos disponibles.</p>
                    </div>
                )}
            </div>
            {state.message && <div className='text-center text-success'><p>{state.message}</p></div>}
            {state.error && <div className='text-center text-danger'><p>{state.error}</p></div>}
        </div>
    );
};
