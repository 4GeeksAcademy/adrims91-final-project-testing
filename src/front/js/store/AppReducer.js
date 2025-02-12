export const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: !!localStorage.getItem('token'),
    isLoading: false,
    error: null,
    message: null,
    events: [],
    eventDetails: [],
    userData: [],
    creatorDetails: [],
    favorites: []
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
                isAuthenticated: false
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
        case 'CREATE_EVENT_SUCCESS':
            return {
                ...state,
                events: [...state.events, action.payload.events],
                message: action.payload.message
            }
        case 'CREATE_EVENT_ERROR':
            return {
                ...state,
                error: action.payload.error
            }
        case 'DELETE_EVENT_SUCCESS':
            return {
                ...state,
                events: action.payload.events,
                message: action.payload.message
            }
        case 'DELETE_EVENT_ERROR':
            return {
                ...state,
                error: action.payload.error
            }
        case 'GET_USER_DATA_SUCCESS':
            return {
                ...state,
                userData: action.payload.userData,
                message: action.payload.message
            }
        case 'GET_USER_DATA_ERROR':
            return {
                ...state,
                error: action.payload.error
            }
        case 'UPDATE_USER_DATA_SUCCESS':
            return {
                ...state,
                userData: action.payload.userData,
                message: action.payload.message
            }
        case 'UPDATE_USER_DATA_ERROR':
            return {
                ...state,
                error: action.payload.error
            }
        case 'EVENT_DETAIL_SUCCESS':
            return {
                ...state,
                eventDetails: action.payload.eventDetails
            }
        case 'EVENT_DETAIL_ERROR':
            return {
                ...state,
                error: action.payload.error
            }
        case 'SEARCH_EVENTS_SUCCESS':
            return {
                ...state,
                events: action.payload.searchedEvents
            }
        case 'SEARCH_EVENTS_ERROR':
            return {
                ...state,
                error: action.payload.error
            }
        case 'GET_CREATOR_DETAILS_SUCCESS':
            return {
                ...state,
                creatorDetails: action.payload.creatorDetails
            }
        case 'GET_CREATOR_DETAILS_ERROR':
            return {
                ...state,
                error: action.payload.error
            }
        case 'GET_FAVORITES_SUCCESS':
            return {
                ...state,
                favorites: action.payload.favorites
            }
        case 'GET_FAVORITES_ERROR':
            return {
                ...state,
                error: action.payload.error
            }
        case 'ADD_FAVORITES_SUCCESS':
            return {
                ...state,
                message: action.payload.message
            }
        case 'ADD_FAVORITES_ERROR':
            return {
                ...state,
                error: action.payload.error
            }
        case 'DELETE_FAVORITES_SUCCESS':
            return {
                ...state,
                message: action.payload.message
            }
        case 'DELETE_FAVORITES_ERROR':
            return {
                ...state,
                error: action.payload.error
            }
        default:
            return state
    }
}