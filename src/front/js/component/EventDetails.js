import React, { useContext, useEffect } from "react";
import { Context } from "../store/AppContext";
import { useParams } from "react-router-dom";


export const EventDetails = () => {

    const { state, getEvent } = useContext(Context);
    const { eventId } = useParams()

    useEffect(() => {
        getEvent(eventId)
    }, [])



    return (
        <div className="m-0 m-auto">
            <h1 className="text-center">Detalle del evento</h1>
            <div className="card mb-3" style={{ maxWidth: '540px' }}>
                <div className="row g-0">
                    {state.eventDetails.map(event => (
                        <div className="row" key={event.id}>
                            <div className="col-md-4">
                                <img src={event.image} className="img-fluid rounded-start" alt="..." />
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h5 className="card-title">{event.title}</h5>
                                    <p className="card-text">{event.description}</p>
                                    <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div >
    )
}