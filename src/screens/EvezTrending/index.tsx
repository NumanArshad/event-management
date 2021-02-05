import React, { memo, useCallback } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import ROUTES from "ultis/routes";
import ButtonFilter from "components/buttons/ButtonFilter";
import EventItem from "components/EventItem";
import keyExtractor from "ultis/keyExtractor";
import { getAllTrendingEvents } from "redux/events/events.actions";
import isEmpty from "ultis/isEmpty";
import { getDistanceByLatLong } from "ultis/functions";

const data = [
  {
    thumbnail: require("@assets/Trending/trending_1.png"),
    // tag: ["#culture"],
    //  reviewTimes: 1.2,
    eventName: "Sculpture Without Sight Experience",
    location: "812 Thatcher Court Yonkers…",
    distance: 4,
    //  currentAttending: 19,
    // //maxAttending: 5000,
    save: false,
    //  rate: 4.5,
  },
  {
    thumbnail: require("@assets/Trending/trending_2.png"),
    // tag: ["#fashion"],
    //  reviewTimes: 2.4,
    eventName: "Mahogany Bridal Fair 2018",
    location: "The Grand Connaught Rooms…",
    distance: 2.5,
    //  currentAttending: 2568,
    //maxAttending: 10000,
    save: false,
    // rate: 4.5,
  },
  {
    thumbnail: require("@assets/Trending/trending_3.png"),
    // tag: ["#Fashion", "#Convention"],
    // reviewTimes: 1.2,
    eventName: "Mahogany Bridal Fair 2016",
    location: "The Grand Connaught Rooms…",
    distance: 3.5,
    //  currentAttending: 2568,
    //maxAttending: 5000,
    save: false,
    // rate: 4.5,
    timeCountDown: "7 Days 06 Hours 27 Mins 44 secs",
  },
];

const EvezTrending = memo(() => {
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const { all_trending_events } = useSelector<any, any>(
    (state) => state.events
  );

  const { all_errors } = useSelector<any, any>((state) => state.errors);
  const { loading } = useSelector<any, any>((state) => state.loading);
  //const { login_Session } = useSelector<any, any>((state) => state.auth);

  const onPressFilter = useCallback(() => {
    navigation.navigate(ROUTES.FilterEvez);
  }, [navigation]);

  useFocusEffect(
    useCallback(() => {
    //  if()
      // getCurrentPosition();
      console.log(getDistanceByLatLong(-8.853059, 63.976067));
      dispatch(getAllTrendingEvents());
    }, [dispatch, navigation])
  );

  const renderItem = useCallback(({ item }) => {
    const {
      // thumbnail,
      // tag,
      // reviewTimes,
      // eventName,
      // location,
      // distance,
      // currentAttending,
      // save,
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
        // reviewTimes={20}
        id={event_id}
        eventName={event_name}
        location={address}
        distance={lat_long}
        timeCountDown="7 Days 06 Hours 27 Mins 44 secs"
        //  currentAttending={currentAttending}
        //  eventTime={`SUN, MAR. 25  -  4:30 PM EST`}
        eventTime={`${event_date}  -  ${start_time}`}
        rate={rating}
        //  //maxAttending={//maxAttending}
        save={false}
      />
    );
  }, []);

  return (
    <View style={styles.container}>
      {!isEmpty(all_trending_events) ? (
        <FlatList
          style={styles.scroll}
          data={all_trending_events}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainerStyle}
        />
      ) : !isEmpty(all_errors) ? (
        <Text>{all_errors?.message}</Text>
      ) : (
        <Text>...Loading</Text>
      )}
      <ButtonFilter onPress={onPressFilter} />
    </View>
  );
});

export default EvezTrending;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 24,
    backgroundColor: "#FFF",
  },
  scroll: {
    width: "100%",
  },
  contentContainerStyle: {
    paddingTop: 24,
  },
});
