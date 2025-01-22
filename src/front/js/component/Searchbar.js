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
            <nav className="navbar bg-body-tertiary">
                <div className="container-fluid">
                    <form onSubmit={handleSubmit} className="d-flex" role="search">
                        <input value={searchInput} onChange={(e) => setSearchInput(e.target.value)} className="form-control me-2" type="search" placeholder="Buscar" aria-label="Search" />
                        <button className="btn btn-outline-success" type="submit">Buscar</button>
                    </form>
                </div>
            </nav>
        </>
    )
}