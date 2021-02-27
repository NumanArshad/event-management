import { receipentTransactions } from "redux/users/users.actions";
import { alertMessage } from "ultis/alertToastMessages";
import firebase from "ultis/services/FirebaseConfig";

const groupCollection = firebase.firestore().collection("groups");

export const createGroup = payload => {
    groupCollection.add(payload)
        .then(res => {
            alertMessage("group Created successfully!");
            receipentTransactions(payload?.members, res?.id)
        })
        .catch(error => alertMessage(`error in creating group is ${error}`))
}

export const getAuthGroupsObserver = callback => (dispatch, getState) => {
    const { login_Session: { groups } } = getState()?.auth;

    groups?.length ? groupCollection.where('__name__',"in", groups).onSnapshot(snapshot => {
        let groups = [];
        snapshot.forEach(res => {
            groups.push({
                ...res.data(),
                id: res.id
            })
        })

      //  console.log("hey groups are", groups)
        callback(groups)
    }) : callback([]);
}