import React, { memo, useCallback, useState } from "react";
import { StyleSheet, View, FlatList, Button, Text } from "react-native";
import EventItem from "components/EventItem";
import keyExtractor from "ultis/keyExtractor";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { getAllEvents } from "redux/events/events.actions";
import { height_screen, width_screen } from "ultis/dimensions";
import { TouchableOpacity } from "react-native-gesture-handler";
import isEmpty from "ultis/isEmpty";
import Color from "ultis/color";
import { capitalizeFirstLetter, formatDateTime, getImage } from "ultis/functions";
import ButtonFilter from "components/buttons/ButtonFilter";
import ROUTES from "ultis/routes";

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

  const {params} = useRoute();
  const { all_attended_events } = useSelector<any, any>(
    (state) => state.events
  );
  const { all_errors } = useSelector<any, any>((state) => state.errors);
  const { loading } = useSelector<any, any>((state) => state.loading);
  const [eventStatus, setEventStatus] = useState("saved");

  useFocusEffect(
    useCallback(() => {
      dispatch(getAllEvents(eventStatus ?? params?.eventType));
      params?.eventType && setEventStatus(params?.eventType);
    }, [dispatch, eventStatus, params])
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
      image,
      duration
    } = item;
    return (
      <EventItem
        thumbnail={getImage(image)}
        tag={type_name}
        id={event_id}
        eventName={event_name}
        location={address}
        distance={lat_long}
       // timeCountDown="15 Days 06 Hours 27 Mins 44 secs"
        eventDateTime={formatDateTime(event_date, start_time)}
        rate={rating}
        //save
        duration={duration}

      />
    );
  }, []);

  const onPressFilter = useCallback(() => {
    navigation.navigate(ROUTES.FilterEvez, {
      activeFilter: {eventType: capitalizeFirstLetter(eventStatus)},
      isProfileSavedAttended: true
    });
  }, [navigation, params, eventStatus]);

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginTop: height_screen * 0.02,
        }}
      >
        {/* <TouchableOpacity onPress={() => setEventStatus("saved")}>
          <Text
            style={[
              styles.loginBtn,
              {
                backgroundColor:
                  eventStatus === "saved" ? Color.GRAD_COLOR_3 : `#fff`,

                color: eventStatus === "saved" ? `#fff` : Color.GRAD_COLOR_3,
              },
            ]}
          >
            Saved
          </Text>
        </TouchableOpacity> */}
        {/* <TouchableOpacity onPress={() => setEventStatus("attended")}>
          <Text
            style={[
              styles.loginBtn,
              {
                backgroundColor:
                  eventStatus === "attended" ? Color.GRAD_COLOR_3 : `#fff`,
                color: eventStatus === "attended" ? `#fff` : Color.GRAD_COLOR_3,
              },
            ]}
          >
            Attended
          </Text>
        </TouchableOpacity> */}
      </View>
      {loading ? (
        <Text>...loading</Text>
      ) : !isEmpty(all_errors) ? (
        <Text style={{ color: Color.GRAD_COLOR_1 }}>{all_errors}</Text>
      ) : (
        <FlatList
          data={all_attended_events}
          showsVerticalScrollIndicator={false}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          bounces={false}
          contentContainerStyle={styles.contentContainerStyle}
        />
      )}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ButtonFilter onPress={onPressFilter} />
      </View>
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
  loginBtn: {
    height: height_screen * 0.06,
    width: width_screen * 0.25,
    backgroundColor: Color.GRAD_COLOR_3,
    borderRadius: 10,
    marginTop: height_screen * 0.01,
    textAlign: "center",
    paddingTop: height_screen * 0.015,
    color: "#fff",
    borderWidth: 0.5,
    borderColor: Color.GRAD_COLOR_3,
  },
});
