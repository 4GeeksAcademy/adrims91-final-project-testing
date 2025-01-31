import React, { useContext, useEffect } from "react";
import { Context } from "../store/AppContext";
import { Link, useParams } from "react-router-dom";
import "../../styles/eventDetails.css"

export const EventDetails = () => {

    const { state, getEvent, getCreatorDetails, getFavorites, addFavorite, deleteFavorite } = useContext(Context);
    const { eventId } = useParams();

    useEffect(() => {
        getCreatorDetails(eventId);
        getEvent(eventId);
        getFavorites(eventId)
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

                            {state.favoritesUsername && <div><p className="card-text">Le gusta a: {state.favoritesUsername}</p></div>}
                            {state.creatorDetails.map(creator => (
                                <p key={creator.id} className="card-text">Evento creado por <Link className="card-text" to={`/creator-details/${creator.id}`}><strong>{creator.username}</strong></Link> el día {creator.created_at}</p>
                            ))}
                        </div>
                        <div className="card-footer mt-2 text-center">
                            {!state.favorites.some(fav => fav.event_id === event.id) ? <i onClick={() => {
                                addFavorite(event.id)
                            }} className="fa-regular fa-heart fa-xl text-danger"></i> : <i onClick={() => {
                                deleteFavorite(event.id)
                            }} className="fa-solid fa-heart fa-xl"></i>}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
