import React, { useContext, useEffect } from "react";
import { Context } from "../store/AppContext";
import { useParams } from "react-router-dom";
import "../../styles/eventDetails.css"

export const EventDetails = () => {

    const { state, getEvent, getCreatorDetails } = useContext(Context);
    const { eventId } = useParams();

    useEffect(() => {
        getEvent(eventId);
        getCreatorDetails(eventId);
    }, [eventId]);

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-5">Detalle del evento</h1>
            {state.eventDetails.map(event => (
                <div key={event.id} className="d-flex justify-content-center mb-4">
                    <div className="card col-md-8 shadow-lg border-0 rounded-lg">
                        <img src={event.image} className="card-img-top" alt="Imagen del evento" />
                        <div className="card-body text-center">
                            <h5 className="card-title text-primary">{event.title}</h5>
                            <p className="card-text">{event.description}</p>
                            <p className="card-text text-muted"><strong>Fecha:</strong> {event.date}</p>
                            <p className="card-text text-muted"><strong>Hora:</strong> {event.time}</p>
                            {state.creatorDetails.map(creator => (
                                <p key={creator.id} className="card-text text-danger">Evento creado por: {creator.first_name} el día {creator.created_at}</p>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
