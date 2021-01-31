import React, { memo, useEffect, useState, useCallback } from "react";
import { ScrollView } from "react-native";
import UserItem from "components/UserItem";
import { getAllUsers } from "redux/users/users.actions";
import { useFocusEffect } from "@react-navigation/native";


const FriendRequest = memo(() => {
  const [users, setUsers] = useState([]);


  useFocusEffect(
    useCallback(() => {
      getAllUsers((res) => setUsers(res));
    }, [])
  );



  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {users?.map((user, key) => (
        <UserItem
          key={key}
          {...user}
          image={require("assets/Followers/img.jpg")}
          actionButton="friendRequest"
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

export default FriendRequest;
