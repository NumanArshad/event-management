import React, { memo, useCallback, useEffect, useState } from "react";
import { ScrollView } from "react-native";
import UserItem from "components/UserItem";
import { getAllUsers, getUsersbyDocRefList } from "redux/users/users.actions";
import { useSelector } from "react-redux";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import ROUTES from "ultis/routes";
import isEmpty from "ultis/isEmpty";

const Friendlist = memo(() => {
  const [users, setUsers] = useState([]);

  const {
    login_Session:{friends} ,
  } = useSelector<any, any>((state) => state?.auth);



  useFocusEffect(
    useCallback(() => {
    getUsersbyDocRefList(friends,setUsers);
    }, [friends])
  );

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {users?.map((user, key) => (
        <UserItem
          key={key}
          {...user}
//          image={avatar}
        />
      ))}
    </ScrollView>
  );
});

export default Friendlist;
