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
            <form onSubmit={handleSubmit} className="mb-1" role="search">
                <input value={searchInput} onChange={(e) => setSearchInput(e.target.value)} className="form-control" type="search" placeholder="Buscar evento" aria-label="Search" />
            </form>
        </>
    )
}