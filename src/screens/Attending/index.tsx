import React, {memo, useEffect} from 'react';
import {ScrollView, Text} from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import UserItem from 'components/UserItem';
import {useRoute} from "@react-navigation/native";
import { getEventAttendees } from 'redux/attendEvent/attendEvent.actions';
import { noFoundImg } from 'ultis/constants';
interface attendeeUser {
  citizen_id: string;
  first_name: string;
  last_name: string
}

const Attending = memo(() => {
  const dispatch = useDispatch();

  const {params} = useRoute();
  const {all_event_attendees} = useSelector<any, any>(state => state?.attendance)
  const {loading} = useSelector<any, any>(state => state?.loading)
  
  useEffect(() => {
    dispatch(getEventAttendees(params?.eventId));
  }, [dispatch]);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {
       loading ?
       <Text>
         ...loading
       </Text> :
       all_event_attendees?.map(({citizen_id, first_name}:attendeeUser)=>(
        <UserItem
        image={noFoundImg}
        user_name={first_name}
        key={citizen_id}
      />   
       ))
      }
    </ScrollView>
  );
});

export default Attending;
