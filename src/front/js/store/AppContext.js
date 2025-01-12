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
                dispatch({ type: 'LOGIN_SUCCESS', payload: { "message": "Autenticado correctamente", "username": data.username, "first_name": data.first_name, "last_name": data.last_name, "token": data.token } })
            } else {
                console.error('error')
            }
        } catch (error) {
            console.error(error)
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
            } else {
                const errorData = await response.json()
                dispatch({ type: 'REGISTER_ERROR', payload: { "error": errorData.error } })
            }
        } catch (error) {
            dispatch({ type: 'REGISTER_ERROR', payload: { "error": error.message } })
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
    }



    return (
        <Context.Provider value={{ state, dispatch, login, getEvents, logout, register }}>
            {children}
        </Context.Provider>
    )
}