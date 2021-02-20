import { alertMessage } from "ultis/alertToastMessages";
import firebase from "ultis/services/FirebaseConfig";

const groupCollection = firebase.firestore().collection("groups");

export const createGroup = payload => {
    groupCollection.add(payload)
    .then(res => alertMessage("group Created successfully!"))
    .catch(error => alertMessage(`error in creating group is ${error}`))
}

export const getAuthGroupsObserver = callback => (dispatch, getState) => {
    const { login_Session: { user_doc_id } } = getState()?.auth;

    groupCollection.onSnapshot(snapshot => {
        let groups = [];
        snapshot.forEach(res => {
            groups.push({
                ...res.data(),
                id: res.id
            })
        })

        console.log("hey groups are", groups)
        callback(groups)
    })
}