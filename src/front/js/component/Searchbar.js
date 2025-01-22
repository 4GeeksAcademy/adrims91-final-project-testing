import React, { useContext, useState } from "react";
import { Context } from "../store/AppContext";

export const Searchbar = () => {
    const { searchEvents } = useContext(Context)
    const [searchInput, setSearchInput] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        searchEvents(searchInput)
    }


    return (
        <>
            <form onSubmit={handleSubmit} className="d-flex me-1 mb-1" role="search">
                <input value={searchInput} onChange={(e) => setSearchInput(e.target.value)} className="form-control me-2" type="search" placeholder="Buscar" aria-label="Search" />
                <button className="btn btn-outline-primary" type="submit">Buscar</button>
            </form>
        </>
    )
}