import React, { memo, useCallback, useState } from "react";
import { StyleSheet, View, FlatList, Button } from "react-native";
import EventItem from "components/EventItem";
import keyExtractor from "ultis/keyExtractor";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { getAllEvents } from "redux/events/events.actions";

const data = [
  {
    thumbnail: require("@assets/EventAroundU/around_u_2.png"),
    tag: ["#fashion", "#convention"],
    reviewTimes: 2.4,
    eventName: 'Bottled Art" Wine Painting Nigh',
    location: "The Grand Connaught Rooms...",
    distance: 3.5,
    currentAttending: 2568,
    maxAttending: 10000,
    save: true,
  },
];

const ProfileSaved = memo(() => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { all_saved_events } = useSelector<any, any>((state) => state.events);
  const [eventStatus, setEventStatus] = useState("saved");

  useFocusEffect(
    useCallback(() => {
      dispatch(getAllEvents(eventStatus));
    }, [dispatch, eventStatus])
  );

  
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
    } = item;
    return (
      <EventItem
        thumbnail={require("@assets/Trending/trending_3.png")}
        tag={type_name}
        id={event_id}
        eventName={event_name}
        location={address}
        distance={lat_long}
        timeCountDown="15 Days 06 Hours 27 Mins 44 secs"
        eventTime={`${event_date}  -  ${start_time}`}
        rate={rating}
        save
      />
    );
  }, []);

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        <Button
          title="Saved"
          color={eventStatus === "saved" ? `black` : ``}
          onPress={() => setEventStatus("saved")}
        />
        <Button
          title="Attended"
          color={eventStatus === "attended" ? `black` : ``}
          onPress={() => setEventStatus("attended")}
        />
      </View>

      <FlatList
        data={all_saved_events}
        showsVerticalScrollIndicator={false}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        bounces={false}
        contentContainerStyle={styles.contentContainerStyle}
      />
    </View>
  );
});
export default ProfileSaved;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    backgroundColor: "#FFF",
  },
  contentContainerStyle: {
    paddingTop: 14,
    paddingBottom: 20,
  },
});
