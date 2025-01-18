import React, { useContext, useEffect } from "react";
import { Context } from "../store/AppContext";
import '../../styles/cards.css'


export const Cards = () => {
    const { state, getEvents, deleteEvent } = useContext(Context);

    useEffect(() => {
        getEvents();
    }, [state.message]);

    return (
        <div className="container my-5">
            <div className="row row-cols-1 row-cols-md-2 g-4">
                {state.events.length !== 0 ? state.events.map((event, index) => (
                    <div key={event.id || index} className="col">
                        <div className="card shadow-sm border-light rounded">
                            <p onClick={() => deleteEvent(event.id)}>x</p>
                            <img src={event.image} className="img-fluid" style={{ maxHeight: '400px' }} alt="Imagen" />
                            <div className="card-body">
                                <h5 className="card-title text-primary">{event.title}</h5>
                                <p className="card-text">{event.description}</p>
                                <p className="card-text text-muted">Fecha: {event.date}</p>
                                <p className="card-text text-muted">Hora: {event.time}</p>
                                <a href="#" className="btn btn-success">Unirse al plan</a>
                            </div>
                        </div>
                        {state.message && <div className='text-center text-success'><p>{state.message}</p></div>}
                        {state.error && <div className='text-center text-danger'><p>{state.error}</p></div>}
                    </div>
                )) : (
                    <div className="col-12 text-center">
                        <p>No hay eventos disponibles.</p>
                    </div>
                )}
            </div>
        </div>
    );
};
