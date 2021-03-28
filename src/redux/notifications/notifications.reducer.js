import { GET_ALL_INBOX_NOTIFICATIONS, GET_ALL_NOTIFICATIONS } from "../actionTypes"

const initialState = {
    ////excluding inbox message notification
    all_notifications: null,
    ////inbox message notification
    all_inbox_message_notification: null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ALL_NOTIFICATIONS:
            return {
                ...state,
                all_notifications: action.payload
            }
        case GET_ALL_INBOX_NOTIFICATIONS:
            return {
                ...state,
                all_inbox_message_notification: action.payload
            }
        default:
            return state
    }
}