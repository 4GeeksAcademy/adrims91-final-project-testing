import React, { useContext, useEffect } from "react";
import { Context } from "../store/AppContext";
import '../../styles/cards.css'


export const Cards = () => {
    const { state, getEvents } = useContext(Context);

    useEffect(() => {
        getEvents();
    }, [state.events.title]);

    return (
        <div className="container my-5">
            <div className="row row-cols-1 row-cols-md-2 g-4">
                {state.events ? state.events.map((event, index) => (
                    <div key={event.id || index} className="col">
                        <div className="card shadow-sm border-light rounded">
                            <img src='https://media.istockphoto.com/id/1272167524/es/vector/pr%C3%B3ximamente-sello-de-caucho-espa%C3%B1ol.jpg?s=612x612&w=0&k=20&c=tWKvBF9gYx40fipAoWZN0uZjuQcuYClYh7jB97ZaUaY=' className="card-img-top" alt="Imagen" />
                            <div className="card-body">
                                <h5 className="card-title text-primary">{event.title}</h5>
                                <p className="card-text">{event.description}</p>
                                <p className="card-text text-muted">Fecha: {event.date}</p>
                                <p className="card-text text-muted">Hora: {event.time}</p>
                                <a href="#" className="btn btn-success">Unirse al plan</a>
                            </div>
                        </div>
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
