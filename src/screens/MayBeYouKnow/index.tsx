import React, { memo, useCallback, useEffect, useState } from "react";
import { ScrollView } from "react-native";
import UserItem from "components/UserItem";
import { getAllUsers, getUsersbyDocRefList } from "redux/users/users.actions";
import { useSelector } from "react-redux";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import ROUTES from "ultis/routes";

const MayBeYouKnow = memo(() => {
  const [users, setUsers] = useState([]);

  const {
    login_Session: { user_id, friends },
  } = useSelector<any, any>((state) => state?.auth);

  useEffect(() => {
    getAllUsers((res) => setUsers(res));
  }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {users?.map(
        (user, key) =>
          //@ts-ignore
          user_id !== user?.user_id &&
          !friends.includes(user?.id) && (
            <UserItem
              key={key}
              {...user}
              image={require("assets/Followers/img.jpg")}
              actionButton="follow"
            />
          )
      )}
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
