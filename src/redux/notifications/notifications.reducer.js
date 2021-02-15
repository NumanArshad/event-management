import { GET_ALL_NOTIFICATIONS } from "../actionTypes"

const initialState = {
    all_notifications: null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ALL_NOTIFICATIONS:
            return {
                all_notifications: action.payload
            }
        default:
            return state
    }
}