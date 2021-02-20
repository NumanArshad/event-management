import React, { memo, useState, useCallback } from "react";
import { ScrollView } from "react-native";
import UserItem from "components/UserItem";
import { getUsersbyDocRefList } from "redux/users/users.actions";
import { useFocusEffect } from "@react-navigation/native";
import { useSelector } from "react-redux";

const FriendRequest = memo(() => {
  const [users, setUsers] = useState([]);
  const {
    login_Session: { friendRequests, friends },
  } = useSelector<any, any>((state) => state?.auth);

  const pendingRequests = friendRequests
    //@ts-ignore
    ?.filter(({ status }) => status === "pending")
    ?.map(({ user_doc_id }: { user_doc_id: string }) => 
      user_doc_id);


   console.log("nice is", pendingRequests,friendRequests, users)
  useFocusEffect(
    useCallback(() => {
      getUsersbyDocRefList(pendingRequests,  setUsers);
    }, [friendRequests, friends])
  );
//console.log("data is", users)

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {users?.map((user, key) => (
        <UserItem
          key={key}
          {...user}
         // image={require("assets/Followers/img.jpg")}
          actionButton="friendRequest"
        />
      ))}
    </ScrollView>
  );
});

export default FriendRequest;
