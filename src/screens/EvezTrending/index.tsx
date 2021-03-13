import React, { memo, useCallback, useRef } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import ROUTES from "ultis/routes";
import ButtonFilter from "components/buttons/ButtonFilter";
import EventItem from "components/EventItem";
import keyExtractor from "ultis/keyExtractor";
import {
  getAllTrendingEvents,
  getFilteredEvents,
} from "redux/events/events.actions";
import isEmpty from "ultis/isEmpty";
import {
  formatDateTime,
  getEventTimeDown,
  getImage,
  isEventInProgress,
} from "ultis/functions";
import dayjs from "dayjs";
import MyNotification from "screens/Notifications";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { TouchableOpacity } from "react-native-gesture-handler";
import { sendPushNotification } from "redux/notifications/notifications.actions";
import Color from "ultis/color";
import { alertMessage } from "ultis/alertToastMessages";

const EvezTrending = memo(() => {
  const navigation = useNavigation();

  const { params } = useRoute();

  const dispatch = useDispatch();
  const { all_trending_events } = useSelector<any, any>(
    (state) => state.events
  );

  const { all_errors } = useSelector<any, any>((state) => state.errors);
  const { loading } = useSelector<any, any>((state) => state.loading);

  const flList = useRef();

  //const { login_Session } = useSelector<any, any>((state) => state.auth);

  const onPressFilter = useCallback(() => {
    navigation.navigate(ROUTES.FilterEvez, {
      activeFilter: params,
    });
  }, [navigation, params]);

  useFocusEffect(
    useCallback(() => {
      //@ts-ignore
      const { eventLocation, eventType } = params || {};
      dispatch(
        eventLocation || eventType
          ? getFilteredEvents(eventLocation, eventType)
          : getAllTrendingEvents()
      );
    //  flList?.current.scrollToOffset({ animated: true, y: 0 });
    }, [dispatch, navigation, params])
    
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
      duration,
      type_name,
      image
    } = item;

    //console.log(getImage(image))
    return (
      <EventItem
        thumbnail={getImage(image)}
        tag={type_name}
        id={event_id}
        eventName={event_name}
        location={address}
        distance={lat_long}
        eventDateTime={formatDateTime(event_date, start_time)}
        rate={rating}
        duration={duration}
      />
    );
  }, []);


  return (
    <View style={styles.container}>
       {/* <MyNotification /> */}
       {/* <MyNotification />
*/}
     
      {!isEmpty(all_trending_events) ? (
        <FlatList
           ref={flList}
          style={styles.scroll}
          data={all_trending_events}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainerStyle}
        />
      ) : !isEmpty(all_errors) ? (
        <Text style={{ color: Color.GRAD_COLOR_1 }}>{all_errors?.message}</Text>
      ) : (
        [...Array(2)].map(() => (
          <EventItem
            thumbnail={require("@assets/Trending/trending_3.png")}
            tag={""}
            id={0}
            eventName={""}
            location={""}
            distance={""}
            eventDateTime={""}
            rate={0}
            duration={""}
            loadFlag={isEmpty(all_trending_events)}
          />
        ))
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
