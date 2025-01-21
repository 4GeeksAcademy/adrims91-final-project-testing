import React, { useContext } from "react";
import { Context } from "../store/AppContext";

export const SearchbarResults = () => {

    const { state } = useContext(Context)

    return (
        <>
            <div className="container">
                {state.searchedEvents.map(event => {
                    <div key={event.id} className="card" style="width: 18rem;">
                        <img src={event.image} className="card-img-top" alt="Event image" />
                        <div className="card-body">
                            <h5 className="card-title">{event.title}</h5>
                            <p className="card-text">{event.description}</p>
                        </div>
                    </div>
                })}
            </div>
        </>
    )
}