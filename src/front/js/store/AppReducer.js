export const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: !!localStorage.getItem('token'),
    username: localStorage.getItem('username'),
    first_name: localStorage.getItem('first_name'),
    last_name: localStorage.getItem('last_name'),
    isLoading: false,
    error: null,
    message: null,
    events: []
}

export const AppReducer = (state, action) => {
    switch (action.type) {
        case 'REGISTER_SUCCESS':
            return {
                ...state,
                message: action.payload.message
            }
        case 'REGISTER_ERROR':
            return {
                ...state,
                error: action.payload.error
            }
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                isAuthenticated: true,
                message: action.payload.message,
                username: action.payload.username,
                first_name: action.payload.first_name,
                last_name: action.payload.last_name,
                token: action.payload.token
            }
        case 'LOGIN_ERROR':
            return {
                ...state,
                error: action.payload.error
            }
        case 'LOGOUT':
            return {
                ...state,
                message: action.payload.message,
                token: localStorage.removeItem('token'),
                isAuthenticated: false,
                username: localStorage.removeItem('username'),
                first_name: localStorage.removeItem('first_name'),
                last_name: localStorage.removeItem('last_name'),
            }
        case 'GET_EVENTS':
            return {
                ...state,
                events: action.payload.events
            }
        case 'CLEAR_MESSAGES':
            return {
                ...state,
                message: null,
                error: null
            }
        default:
            return state
    }
}