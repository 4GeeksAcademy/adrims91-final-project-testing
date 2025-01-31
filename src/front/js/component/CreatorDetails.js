import React, { useContext, useEffect } from "react";
import { Context } from "../store/AppContext";
import { useParams } from "react-router-dom";

export const CreatorDetails = () => {

    const { state, getCreatorDetails } = useContext(Context)
    const { eventId } = useParams()

    useEffect(() => {
        getCreatorDetails(eventId)
    }, [])

    return (
        <>
            <div className="card bg-light container" style={{ maxWidth: '50vw' }}>
                {state.creatorDetails.map(creator => (
                    <div className="row" key={creator.id}>
                        <h3 className="card-title text-center">Perfil de usuario de {creator.username}</h3>
                        <div className="col-6 text-center m-auto">
                            <p className="card-text">
                                <strong>Nombre de usuario:</strong> {creator.username}
                            </p>
                            <p className="card-text">
                                <strong>Nombre:</strong> {creator.first_name}
                            </p>
                            <p className="card-text">
                                <strong>Apellido:</strong> {creator.last_name}
                            </p>
                            <p className="card-text">
                                <strong>Biografía:</strong> {creator.bio}
                            </p>
                        </div>
                        <div className="col-6">
                            <img src='https://significado.com/wp-content/uploads/Imagen-Animada.jpg' className="img-fluid"></img>
                        </div>
                        <div className="card-footer">
                            <p className="card-text text-center"><strong>Contáctame por email:</strong> {creator.email}</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}