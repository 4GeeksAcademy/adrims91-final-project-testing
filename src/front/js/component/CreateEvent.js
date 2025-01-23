import React, { useRef } from "react";
import { CreateEventInputs } from "./CreateEventInputs";

export const CreateEvent = () => {

    const modalRef = useRef(null)

    const openModal = () => {
        modalRef.current.style.display = 'block'
        modalRef.current.classList.add('show')
    }

    const closeModal = () => {
        modalRef.current.style.display = 'none'
        modalRef.current.classList.remove('show')
    }
    return (
        <>
            <button onClick={openModal} type="button" className="btn btn-primary button">
                Crear Evento
            </button>
            <div ref={modalRef} className="modal fade" style={{ display: 'none' }} data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Crea Un Evento</h1>
                            <button onClick={closeModal} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <CreateEventInputs closeModal={closeModal} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}
