import React, { useContext } from "react";
import { Context } from "../store/AppContext";

export const Cards = () => {

    const { state } = useContext(Context)
    return (
        <>
            <div className="d-flex m-2">
                {state.events ? state.events.map(event => (
                    <div key={event.id} className="card" style={{ width: '18rem' }}>
                        <img src="https://picsum.photos/id/237/536/354" className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">{event.title}</h5>
                            <p className="card-text">{event.description}</p>
                            <a href="#" className="btn btn-primary">Unirse al plan</a>
                        </div>
                    </div>
                )) : ''}
            </div>
        </>
    )
}