import React, {memo, useEffect} from 'react';
import {ScrollView, Text} from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import UserItem from 'components/UserItem';
import {useRoute} from "@react-navigation/native";
import { getEventAttendees } from 'redux/attendEvent/attendEvent.actions';
interface attendeeUser {
  citizen_id: string;
  first_name: string;
  last_name: string
}

const Attending = memo(() => {
  const dispatch = useDispatch();

  const {params} = useRoute();
  const {all_event_attendees} = useSelector<any, any>(state => state?.attendance)
  const {loading} = useSelector(state => state?.loading)
  
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
        image={require('assets/Followers/img.jpg')}
        user_name={first_name}
        key={citizen_id}
      />   
       ))
      }
      
      {/* <UserItem
        image={require('assets/Followers/img.jpg')}
        user_name={'Birdie Price'}
        numberFollower={'16K'}
      />
      <UserItem
        image={require('assets/Followers/img.jpg')}
        user_name={'Janie Watts'}
        numberFollower={'490'}
      />
      <UserItem
        image={require('assets/Followers/img.jpg')}
        user_name={'Esther Schultz'}
        numberFollower={'6K'}
      />
      <UserItem
        image={require('assets/Followers/img.jpg')}
        user_name={'Lillian Snyder'}
        numberFollower={'5K'}
      />
      <UserItem
        image={require('assets/Followers/img.jpg')}
        user_name={'Effie Schneider'}
        numberFollower={'39'}
      />
      <UserItem
        image={require('assets/Followers/img.jpg')}
        user_name={'Roy Francis'}
        numberFollower={'282'}
      />
      <UserItem
        image={require('assets/Followers/img.jpg')}
        user_name={'Birdie Horton'}
        numberFollower={'25K'}
      />
      <UserItem
        image={require('assets/Followers/img.jpg')}
        user_name={'Genevieve Doyle'}
        numberFollower={'45989'}
      /> */}
    </ScrollView>
  );
});

export default Attending;
