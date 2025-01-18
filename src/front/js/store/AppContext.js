import React, { createContext, useReducer } from "react";
import { initialState, AppReducer } from "./AppReducer";

export const Context = createContext()

export const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState)

    const login = async ({ username, password }) => {
        try {
            const response = await fetch('https://reimagined-space-computing-machine-4jg4r96r57jxh45g-3001.app.github.dev/api/login', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, password })
            })
            if (response.ok) {
                const data = await response.json()
                localStorage.setItem('username', data.username)
                localStorage.setItem('token', data.token)
                localStorage.setItem('first_name', data.first_name)
                localStorage.setItem('last_name', data.last_name)
                dispatch({ type: 'LOGIN_SUCCESS', payload: { "message": data.message, "username": data.username, "first_name": data.first_name, "last_name": data.last_name, "token": data.token } })
                setTimeout(() => {
                    dispatch({ type: 'CLEAR_MESSAGES' })
                }, 1500);
            } else {
                const errorData = await response.json()
                dispatch({ type: 'LOGIN_ERROR', payload: { "error": errorData.error } })
                setTimeout(() => {
                    dispatch({ type: 'CLEAR_MESSAGES' })
                }, 1500);
            }
        } catch (error) {
            dispatch({ type: 'LOGIN_ERROR', payload: { "error": error.message } })
            setTimeout(() => {
                dispatch({ type: 'CLEAR_MESSAGES' })
            }, 1500);
        }
    }

    const register = async ({ username, email, password }) => {
        try {
            const response = await fetch('https://reimagined-space-computing-machine-4jg4r96r57jxh45g-3001.app.github.dev/api/users', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, email, password })
            })
            if (response.ok) {
                const data = await response.json()
                dispatch({ type: 'REGISTER_SUCCESS', payload: { "message": data.message } })
                setTimeout(() => {
                    dispatch({ type: 'CLEAR_MESSAGES' })
                }, 1500);
            } else {
                const errorData = await response.json()
                dispatch({ type: 'REGISTER_ERROR', payload: { "error": errorData.error } })
                setTimeout(() => {
                    dispatch({ type: 'CLEAR_MESSAGES' })
                }, 1500);
            }
        } catch (error) {
            dispatch({ type: 'REGISTER_ERROR', payload: { "error": error.message } })
            setTimeout(() => {
                dispatch({ type: 'CLEAR_MESSAGES' })
            }, 1500);
        }
    }

    const getEvents = async () => {
        try {
            const response = await fetch('https://reimagined-space-computing-machine-4jg4r96r57jxh45g-3001.app.github.dev/api/events')

            if (response.ok) {
                const data = await response.json()
                dispatch({ type: 'GET_EVENTS', payload: { "events": data.events } })
            } else {
                console.error('Error')
            }
        } catch (error) {
            console.error(error)
        }
    }
    const logout = () => {
        dispatch({ type: 'LOGOUT', payload: { "message": "Cierre de sesión completado" } })
        setTimeout(() => {
            dispatch({ type: 'CLEAR_MESSAGES' })
        }, 1500);
    }
    const createEvent = async (formData) => {
        const token = localStorage.getItem('token')
        try {
            const response = await fetch('https://reimagined-space-computing-machine-4jg4r96r57jxh45g-3001.app.github.dev/api/events', {
                method: 'POST',
                headers: {
                    'Content-Type': "application/json",
                    "Authorization": 'Bearer ' + token
                },
                body: JSON.stringify(formData)
            })
            if (response.ok) {
                const data = await response.json()
                dispatch({ type: 'CREATE_EVENT_SUCCESS', payload: { "events": data, "message": "Evento creado correctamente." } })
                setTimeout(() => {
                    dispatch({ type: 'CLEAR_MESSAGES' })
                }, 1500);
            } else {
                const errorData = await response.json()
                dispatch({ type: 'CREATE_EVENT_ERROR', payload: { "error": errorData.error } })
                setTimeout(() => {
                    dispatch({ type: 'CLEAR_MESSAGES' })
                }, 1500);
            }
        } catch (error) {
            dispatch({ type: 'CREATE_EVENT_ERROR', payload: { "error": error.message } })
            setTimeout(() => {
                dispatch({ type: 'CLEAR_MESSAGES' })
            }, 1500);
        }
    }
    const deleteEvent = async (event_id) => {
        const token = localStorage.getItem('token')
        try {
            const response = await fetch(`https://reimagined-space-computing-machine-4jg4r96r57jxh45g-3001.app.github.dev/api/events/${event_id}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                }
            })
            if (response.ok) {
                dispatch({ type: 'DELETE_EVENT_SUCCESS', payload: { "events": state.events.filter(event => event.id != event_id), "message": "Evento eliminado correctamente." } })
            } else {
                dispatch({ type: 'DELETE_EVENT_ERROR', payload: { "error": "Ha ocurrido un error al eliminar el evento." } })
            }
        } catch (error) {
            dispatch({ type: 'DELETE_EVENT_ERROR', payload: { "error": error.message } })
        }
    }


    return (
        <Context.Provider value={{ state, dispatch, login, getEvents, logout, register, createEvent, deleteEvent }}>
            {children}
        </Context.Provider>
    )
}