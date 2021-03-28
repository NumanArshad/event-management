import React, {
  memo,
  useCallback,
  useRef,
  useState,
} from "react";
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
  getImage,
  splitLatLongStr,
} from "ultis/functions";
import MyNotification from "screens/Notifications";
import { TouchableOpacity } from "react-native-gesture-handler";
import Color from "ultis/color";
import { alertMessage } from "ultis/alertToastMessages";
import CustomBarCodeScanner from "components/CustomBarCodeScanner";
import WatchLocation from "components/WatchLocation";
import IconAroundU from "svgs/IconAroundU";
import FONTS from "ultis/fonts";

const EvezTrending = memo(() => {
  const navigation = useNavigation();

  const { params } = useRoute();

  const dispatch = useDispatch();
  const { all_trending_events } = useSelector<any, any>(
    (state) => state.events
  );

  const [eventLocation, setEventLocation] = useState([]);

  const { all_errors } = useSelector<any, any>((state) => state.errors);

  const flList = useRef();

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
    }, [dispatch, navigation, params])
  );

  useFocusEffect(
    useCallback(() => {
      if (all_trending_events?.length) {
        const eventLocationList = all_trending_events?.map(
          ({ lat_long }: { lat_long: string }) => splitLatLongStr(lat_long)
        );
        setEventLocation(eventLocationList);
        return;
      }
    }, [dispatch, all_trending_events])
  );


  const onPressAllEventAroundYou = useCallback(() => {
    navigation.navigate(ROUTES.AllEventAroundYou, {
      eventLocation,
    });
  }, [navigation, eventLocation]);

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
      image,
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
        rate={rating}
        duration={duration}
      />
    );
  }, []);

  const [pos, setPos] = useState("");

  // useEffect(()=>{
  //  // console.log("hey calllll")
  //   watchUserGeoLocation().then(res =>
  //     {
  //      // console.log("should",{res})
  //       ;setPos(pos => pos= JSON.stringify(res))}
  //     );
  // })

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.headerForU}
        onPress={onPressAllEventAroundYou}
      >
        <IconAroundU />
        <Text style={styles.textHeaderForU}>See All Event Around You</Text>
      </TouchableOpacity>
      <MyNotification />
      {/* <CustomBarCodeScanner /> */}
      {!isEmpty(all_trending_events) ? (
        <FlatList
          ref={flList}
          style={styles.scroll}
          data={all_trending_events}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          showsVerticalScrollIndicator={false}
        //  contentContainerStyle={styles.contentContainerStyle}
        />
      ) : !isEmpty(all_errors) ? (
        <Text style={{ color: Color.GRAD_COLOR_1 }}>{all_errors}</Text>
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
    paddingTop: 0,
  },
  headerForU: {
    flexDirection: "row",
    height: 72,
    justifyContent: "center",
    alignItems: "center",
  },
  textHeaderForU: {
    marginLeft: 16,
    color: Color.GRAD_COLOR_3,
    fontSize: 14,
    fontFamily: FONTS.Regular,
  },
});
