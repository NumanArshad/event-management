import React, { memo, useCallback } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import EventItem from "components/EventItem";
import { useDispatch, useSelector } from "react-redux";
import {

  getAllAttendedEvents,
  getAllSavedEvents,
} from "redux/events/events.actions";
import keyExtractor from "ultis/keyExtractor";
import isEmpty from "ultis/isEmpty";
import { formatDateTime, getImage } from "ultis/functions";
import NoContentFound from "components/NoContentFound";

const EventAroundYou = memo(() => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      dispatch(getAllAttendedEvents());
    }, [dispatch])
  );

  const { all_attended_events } = useSelector<any, any>(
    (state) => state.events
  );
  const { all_errors } = useSelector<any, any>((state) => state.errors);

  const renderItem = useCallback(({ item }) => {
    const {
      event_id,
      event_name,
      address,
      start_time,
      event_date,
      lat_long,
      rating,
      type_name,
      duration,
      image
    } = item;
    return (
      <EventItem
        thumbnail={getImage(image)}
        tag={type_name}
        id={event_id}
        eventName={event_name}
        location={address}
        distance={lat_long}
        eventDateTime={formatDateTime(event_date, start_time)}
        duration={duration}
        rate={rating}
      />
    );
  }, []);


  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>

        {!isEmpty(all_attended_events) ? (
          <FlatList
            style={styles.scroll}
            data={all_attended_events}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.contentContainerStyle}
          />
        ) : 
        !isEmpty(all_errors) ? (
          <NoContentFound text={all_errors}/>
        ) : (
          <Text>...Loading</Text>
        )
        }
      </ScrollView>
    </View>
  );
});

export default EventAroundYou;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 24,
    backgroundColor: "#fff",
  },
  scroll: {
    width: "100%",
  },

  contentContainerStyle: {
    paddingTop: 24,
  },
});