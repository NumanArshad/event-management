import React, { memo, useCallback, useState } from "react";
import { ScrollView } from "react-native";
import UserItem from "components/UserItem";
import { getUsersbyDocRefList } from "redux/users/users.actions";
import { useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";

const MayBeYouKnow = memo(() => {
  const [users, setUsers] = useState([]);

  const {
    login_Session: { user_id, user_doc_id, friends, friendRequests },
  } = useSelector<any, any>((state) => state?.auth);

  //@ts-ignore
  const destReqDocId = friendRequests
    ?.filter(({ status }: {status: string}) => status === "pending")
    ?.map(({ user_doc_id }:{user_doc_id: string}) => user_doc_id);

    console.log("des is", destReqDocId)

  useFocusEffect(
    useCallback(() => {
      getUsersbyDocRefList(
        [user_doc_id, ...friends, ...destReqDocId],
        setUsers,
        "not-in"
      );
    }, [friendRequests])
  );

  console.log("user are ", users, friends, friendRequests);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {users?.map((user, index) => (
        <UserItem
          key={index}
          //@ts-ignore
          //  loginUser={{ user_doc_id, user_id }}
          {...user}
          image={require("assets/Followers/img.jpg")}
          actionButton="addFriend"
        />
      ))}
      {/* <UserItem
        image={require("assets/Followers/img.jpg")}
        name={"Jose Lowe"}
        numberFollower={"179"}
      />
      <UserItem
        image={require("assets/Followers/img.jpg")}
        name={"Hulda James"}
        numberFollower={"944"}
      />
      <UserItem
        image={require("assets/Followers/img.jpg")}
        name={"Louisa Lyons"}
        numberFollower={"641"}
      />
      <UserItem
        image={require("assets/Followers/img.jpg")}
        name={"Bessie Mendoza"}
        numberFollower={"998"}
      />
      <UserItem
        image={require("assets/Followers/img.jpg")}
        name={"Matilda McGuire"}
        numberFollower={"748"}
      />
      <UserItem
        image={require("assets/Followers/img.jpg")}
        name={"Harriett Coleman"}
        numberFollower={"245"}
      />
      <UserItem
        image={require("assets/Followers/img.jpg")}
        name={"Matilda McGuire"}
        numberFollower={"748"}
      />
      <UserItem
        image={require("assets/Followers/img.jpg")}
        name={"Harriett Coleman"}
        numberFollower={"245"}
      /> */}
    </ScrollView>
  );
});

export default MayBeYouKnow;
