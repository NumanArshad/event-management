import React, { memo, useCallback } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import IconAroundU from "svgs/IconAroundU";
import FONTS from "ultis/fonts";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import ROUTES from "ultis/routes";
import EventItem from "components/EventItem";
import ButtonFilter from "components/buttons/ButtonFilter";
import { useDispatch, useSelector } from "react-redux";
import { getAllSavedEvents, getAllTrendingEvents } from "redux/events/events.actions";
import keyExtractor from "ultis/keyExtractor";
import isEmpty from "ultis/isEmpty";

const EventAroundYou = memo(() => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { all_saved_events } = useSelector<any, any>(
    (state) => state.events
  );
  const { all_errors } = useSelector<any, any>((state) => state.errors);

  // const onPressFilter = useCallback(() => {
  //   navigation.navigate(ROUTES.FilterEvez);
  // }, [navigation]);

  useFocusEffect(
    useCallback(() => {
      dispatch(getAllSavedEvents());
    }, [dispatch])
  );

  const onPressAllEventAroundYou = useCallback(() => {
    navigation.navigate(ROUTES.AllEventAroundYou);
  }, [navigation]);

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
        timeCountDown="7 Days 06 Hours 27 Mins 44 secs"
        eventTime={`${event_date}  -  ${start_time}`}
        rate={rating}
        save
      />
    );
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          style={styles.headerForU}
          onPress={onPressAllEventAroundYou}
        >
          <IconAroundU />
          <Text style={styles.textHeaderForU}>
            See All Event Around You - 10km
          </Text>
        </TouchableOpacity>
        {
         !isEmpty(all_saved_events) ?
         <FlatList
           style={styles.scroll}
           data={all_saved_events}
           renderItem={renderItem}
           keyExtractor={keyExtractor}
           showsVerticalScrollIndicator={false}
           contentContainerStyle={styles.contentContainerStyle}
         /> :
        !isEmpty(all_errors) ? 
           <Text>{all_errors?.message}</Text> :
             <Text>...Loading</Text>
      }

      </ScrollView>
      {/* <ButtonFilter onPress={onPressFilter} /> */}
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
  headerForU: {
    flexDirection: "row",
    height: 72,
    justifyContent: "center",
    alignItems: "center",
  },
  textHeaderForU: {
    marginLeft: 16,
    color: "#ED3269",
    fontSize: 14,
    fontFamily: FONTS.Regular,
  },
  contentContainerStyle: {
    paddingTop: 24,
  },
});
