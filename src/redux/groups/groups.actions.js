import { receipentTransactions } from "redux/users/users.actions";
import { alertMessage } from "ultis/alertToastMessages";
import firebase from "ultis/services/FirebaseConfig";

const groupCollection = firebase.firestore().collection("groups");

export const createGroup = payload => {
    groupCollection.add(payload)
        .then(res => {
            alertMessage("Group Created successfully!");
            receipentTransactions(payload?.members, res?.id)
        })
        .catch(error => alertMessage(`error in creating group is ${error}`))
}

export const getAuthGroupsObserver = (callback) => (dispatch, getState) => {
    const { login_Session: { groups: authGroups, user_doc_id } } = getState()?.auth;

    authGroups?.length ? groupCollection
        .onSnapshot(snapshot => {
            let groups = [];
            snapshot.forEach(res => {
                //console.log(res?.id, res.data().createdBy, user_doc_id)
                if (authGroups.includes(res?.id) && res.data().createdBy === user_doc_id) {
                    groups.push({
                        ...res.data(),
                        id: res.id
                    })
                }
            })

            callback(groups)
        }) : callback([]);
}

//other group of which auth is member but not admin
export const getOtherGroups = (callback) => (dispatch, getState) => {
    const { login_Session: { groups: authGroups, user_doc_id } } = getState()?.auth;

    authGroups?.length ?
        groupCollection//.where('__name__', "in", groups)
            .onSnapshot(snapshot => {
                let groups = [];
                snapshot.forEach(res => {
                    if (authGroups.includes(res?.id) && res.data().createdBy !== user_doc_id) {
                        groups.push({
                            ...res.data(),
                            id: res.id
                        })
                    }
                })
                callback(groups)
            }) : callback([]);
}