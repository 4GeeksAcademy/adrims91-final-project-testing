import React, { useContext, useEffect } from "react";
import { Context } from "../store/AppContext";
import '../../styles/cards.css'
import { Link } from "react-router-dom";


export const Cards = () => {
    const { state, getEvents, deleteEvent } = useContext(Context);

    useEffect(() => {
        getEvents();
    }, [state.userData]);

    return (
        <div className="container mt-5 mb-5 text-center fs-3">
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {state.events.length !== 0 ? state.events.map((event, index) => (
                    <div key={event.id || index} className="col">
                        <div className="card shadow-sm border-light rounded col-sm-12 col-lg-12">
                            <p onClick={() => deleteEvent(event.id)}>x</p>
                            <img src={event.image} className="img-fluid" style={{ height: '350px' }} alt="Imagen" />
                            <div className="card-body">
                                <h5 className="card-title text-primary">{event.title}</h5>
                                <p className="card-text">{event.description}</p>
                                <p className="card-text text-muted">Fecha: {event.date}</p>
                                <p className="card-text text-muted">Hora: {event.time}</p>
                                <Link to={`/event/${event.id}`} className="btn btn-success">Ver detalles del evento</Link>
                            </div>
                        </div>
                        {state.message && <div className='text-center text-success'><p>{state.message}</p></div>}
                        {state.error && <div className='text-center text-danger'><p>{state.error}</p></div>}
                    </div>
                )) : (
                    <div className="col-12 m-auto mt-5 p-5 w-100">
                        <p>No hay eventos disponibles.</p>
                    </div>
                )}
            </div>
        </div>
    );
};
