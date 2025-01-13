import React from "react";

export const CreateEvent = () => {
    return (
        <>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                Crear Evento
            </button>
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Crea Un Evento</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="row g-0 text-center">
                                <div className="col-6"><input className="form-control mb-3 p-2" placeholder="Titulo" type="text"></input></div>
                                <div className="col-6"><input className="form-control mb-3 p-2" placeholder="Descripción" type="text"></input></div>
                                <div className="col-6"><input className="form-control mb-3 p-2" type="date"></input></div>
                                <div className="col-6"><input className="form-control mb-3 p-2" type="time"></input></div>
                                <div className="col-6"><select className="form-select mb-3 p-2" aria-label="Default select example">
                                    <option value="1">Madrid</option>
                                    <option value="2">Barcelona</option>
                                    <option value="3">Valencia</option>
                                </select></div>
                                <div className="col-6"><input className="form-control mb-3 p-2" type="file"></input></div>
                                <div className="col"><input style={{ maxWidth: '50%' }} placeholder="€€" className="form-control mb-3 p-2 m-auto" type="number"></input></div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Crear</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}