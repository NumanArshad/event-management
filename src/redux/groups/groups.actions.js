import { GET_AUTH_GROUPS } from "redux/actionTypes";
import { receipentTransactions } from "redux/users/users.actions";
import { alertMessage } from "ultis/alertToastMessages";
import firebase from "ultis/services/FirebaseConfig";

const groupCollection = firebase.firestore().collection("groups");

export const createGroup = (payload, callBack) => {
    groupCollection.add(payload)
        .then(res => {
            alertMessage("Group Created successfully!");
            //navigate to group listing if no member else proceed notifications
            receipentTransactions(payload?.members, res?.id, callBack)
        })
        .catch(error => alertMessage(`error in creating group is ${error}`))
}

export const getAuthGroupsObserver = (newCreatedGroupId) => (dispatch, getState) => {
    const { login_Session: { groups: authUserGroups, user_doc_id } } = getState()?.auth;

const authGroups = newCreatedGroupId ? [...authUserGroups, newCreatedGroupId] : authUserGroups;

    authGroups?.length ? groupCollection
        .onSnapshot(snapshot => {
            let groups = [];
            snapshot.forEach(res => {
            console.log(res?.id, res.data().createdBy, user_doc_id)
                if (authGroups.includes(res?.id) && res.data().createdBy === user_doc_id) {
                    groups.push({
                        ...res.data(),
                        id: res.id
                    })
                }
            })
            dispatch({
                type: GET_AUTH_GROUPS,
                payload: groups
            });

        }) : dispatch({
            type: GET_AUTH_GROUPS,
            payload: []
        });
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

///all groups of which auth is member as a admin or a user
export const getAllAuthGroups = (callback) => (dispatch, getState) => {
    const { login_Session: { groups: authGroups } } = getState()?.auth;

    authGroups?.length ?
        groupCollection
            .onSnapshot(snapshot => {
                let groups = [];
                snapshot.forEach(res => {
                    if (authGroups.includes(res?.id)) {
                        groups.push({
                            ...res.data(),
                            id: res.id
                        })
                    }
                })
                callback(groups)
            }) : callback([]);
}