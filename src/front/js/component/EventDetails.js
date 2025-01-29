import React, { useContext, useEffect } from "react";
import { Context } from "../store/AppContext";
import { useParams } from "react-router-dom";
import "../../styles/eventDetails.css"

export const EventDetails = () => {

    const { state, getEvent, getCreatorDetails, getFavorites, addFavorite } = useContext(Context);
    const { eventId } = useParams();

    useEffect(() => {
        getCreatorDetails(eventId);
        getEvent(eventId);
        getFavorites(eventId)
    }, [eventId, state.message]);





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

                            {state.favorites && <div><p className="card-text">Le gusta a: {state.favorites}</p></div>}
                            {state.creatorDetails.map(creator => (
                                <p key={creator.id} className="card-text text-danger">Evento creado por {creator.username} el día {creator.created_at}</p>
                            ))}
                        </div>
                        <div className="card-footer mt-2 text-center">
                            {!state.favorites.some(fav => fav.user_id === state.userData.id) ? <i onClick={() => {
                                addFavorite(event.id)
                            }} className="fa-regular fa-heart fa-xl text-danger"></i> : <i className="fa-solid fa-heart fa-xl"></i>}
                            {state.message && <div><p>{state.message}</p></div>}
                            {state.error && <div><p>{state.error}</p></div>}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
