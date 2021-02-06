import React, { memo, useCallback, useEffect, useState } from "react";
import {
  Animated,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import keyExtractor from "ultis/keyExtractor";
import NewsItem from "screens/SearchNews/components/NewsItem";
import HeaderEvezNew from "screens/EvezNews/components/HeaderEvezNew";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import ROUTES from "ultis/routes";
import Header from "screens/PeopleProfile/components/Header";
import SvgSearch from "svgs/EvezNews/SvgSearch";
import { adsBannerId } from "data/ads";
import { AdMobBanner } from "expo-ads-admob";
import CalendarPicker from "react-native-calendar-picker";
import headerRight from "components/header/headerRight";
//import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import { height_screen } from "ultis/dimensions";
import FONTS from "ultis/fonts";
import PinLocation from "svgs/PinLocation";
import { ScrollView } from "react-native-gesture-handler";
import { getAllReservedEvents } from "redux/events/events.actions";
import moment from "moment";


const data = [
  {
    imgEvent: require("assets/EvezNews/Finest.png"),
    event: "Fashions Finest\n" + "AW17 During London\n" + "Fashion Week",
    time: "MAR. 10, 2018",
  },
  {
    imgEvent: require("assets/EvezNews/Bike.png"),
    event: "Bike New York for\n" + "Bike Month",
    time: "MAR. 24, 2018",
  },
  {
    imgEvent: require("assets/EvezNews/Washington.png"),
    event: "Washington Square\n" + "Outdoor Art Exhibit",
    time: "MAR. 20, 2018",
  },
  {
    imgEvent: require("assets/EvezNews/LasVegas.png"),
    event: "Why Las Vegas Hotel\n" + "Rooms For You",
    time: "MAR. 15, 2018",
  },
  {
    imgEvent: require("assets/EvezNews/Finest.png"),
    event: "The 1968 Fashion\n" + "Show, the History\n" + "Lesson Melania…",
    time: "MAR. 7, 2018",
  },
  {
    imgEvent: require("assets/EvezNews/Finest.png"),
    event: "Fashions Finest\n" + "AW17 During London\n" + "Fashion Week",
    time: "MAR. 10, 2018",
  },
  {
    imgEvent: require("assets/EvezNews/Bike.png"),
    event: "Bike New York for\n" + "Bike Month",
    time: "MAR. 24, 2018",
  },
  {
    imgEvent: require("assets/EvezNews/Washington.png"),
    event: "Washington Square\n" + "Outdoor Art Exhibit",
    time: "MAR. 20, 2018",
  },
  {
    imgEvent: require("assets/EvezNews/LasVegas.png"),
    event: "Why Las Vegas Hotel\n" + "Rooms For You",
    time: "MAR. 15, 2018",
  },
  {
    imgEvent: require("assets/EvezNews/Finest.png"),
    event: "The 1968 Fashion\n" + "Show, the History\n" + "Lesson Melania…",
    time: "MAR. 7, 2018",
  },
  {
    imgEvent: require("assets/EvezNews/Finest.png"),
    event: "Fashions Finest\n" + "AW17 During London\n" + "Fashion Week",
    time: "MAR. 10, 2018",
  },
  {
    imgEvent: require("assets/EvezNews/Bike.png"),
    event: "Bike New York for\n" + "Bike Month",
    time: "MAR. 24, 2018",
  },
  {
    imgEvent: require("assets/EvezNews/Washington.png"),
    event: "Washington Square\n" + "Outdoor Art Exhibit",
    time: "MAR. 20, 2018",
  },
  {
    imgEvent: require("assets/EvezNews/LasVegas.png"),
    event: "Why Las Vegas Hotel\n" + "Rooms For You",
    time: "MAR. 15, 2018",
  },
  {
    imgEvent: require("assets/EvezNews/Finest.png"),
    event: "The 1968 Fashion\n" + "Show, the History\n" + "Lesson Melania…",
    time: "MAR. 7, 2018",
  },
];

const EvezNews = memo(() => {
  const navigation = useNavigation();
  const [dateChange, setdateChange] = useState("");
  const [listDate, setlistDate] = useState("");
  const [checkEvent, setcheckEvent] = useState("");
  const onNewDetail = useCallback(() => {
    navigation.navigate(ROUTES.NewDetail);
  }, [navigation]);
  const onSearchNews = useCallback(() => {
    navigation.navigate(ROUTES.SearchNews);
  }, [navigation]);
  const renderItem = useCallback(
    ({ item }) => {
      const { imgEvent, event, time } = item;
      return (
        <TouchableOpacity onPress={onNewDetail}>
          <NewsItem imgEvent={imgEvent} event={event} time={time} />
        </TouchableOpacity>
      );
    },
    [onNewDetail]
  );

  const dispatch = useDispatch();
  const { all_reserved_events } = useSelector<any, any>(
    (state) => state.events
  );

  const getDateConsole = (date) => {
    const d = moment(date).format("MM/DD/YYYY"); //02/14/2021
    console.log("DATE ", d);
    setdateChange(d);
    const result = all_reserved_events?.filter(
      (event) => event.event_date.toString() === d
    );
    console.log("RESULT ON CLICK", result);
    setcheckEvent(result);
  };

  useEffect(() => {
    if (Array.isArray(all_reserved_events)) {
      makeCustom();
    } else {
      dispatch(getAllReservedEvents());
    }
  }, [dispatch, all_reserved_events]);

  const onDetail = useCallback((id) => {
    navigation.navigate(ROUTES.EventDetail, {
      data: {id},
    });
  }, []);

  // const headerList = useCallback(() => <HeaderEvezNew />, []);
  // const scrollY = new Animated.Value(0);

  const makeCustom = () => {
    var data =
      Array.isArray(all_reserved_events) && all_reserved_events.length > 0
        ? all_reserved_events.map((data, id) => ({
            date: data.event_date,
            // Random colors
            style: {
              backgroundColor: "#F05F3E",
            },
            textStyle: { color: "#fff" }, // sets the font color
            containerStyle: [], // extra styling for day container
          }))
        : null;
    setlistDate(data);
  };

  let customDatesStyles = [{}];

  return (
    <View style={styles.container}>
      {/* <Header onPress={onSearchNews} svg={<SvgSearch />} scrollY={scrollY} /> */}
      <ScrollView>
        <CalendarPicker
          onDateChange={(e) => getDateConsole(e)}
          selectedDayColor="#ED3269"
          textStyle={{
            fontSize: 16,
            lineHeight: 60,
          }}
          weekdays={["S", "M", "T", "W", "T", "F", "S"]}
          todayBackgroundColor="#ED3269"
          // nextTitle={rightIcon}
          // previousTitle={lefttIcon}
          dayLabelsWrapper={{ borderTopWidth: 0, borderBottomWidth: 0 }}
          customDatesStyles={listDate}
        />

        {Array.isArray(checkEvent) && checkEvent.length > 0
          ? checkEvent.map((data, id) => (
              <TouchableOpacity onPress={() => onDetail(data.event_id)}>
                <LinearGradient
                  colors={["#ED3269", "#F05F3E"]}
                  start={{ x: 0, y: 1 }}
                  end={{ x: 1, y: 1 }}
                  style={{
                    width: "95%",
                    alignSelf: "center",
                    borderRadius: 10,
                  }}
                  key={id}
                >
                  <Text style={styles.EventName2}>
                    Event Reserved on {data?.event_date}
                  </Text>

                  <View style={styles.mainCard}>
                    <View style={styles.earningDetails}>
                      <Text style={styles.EventName}>
                        {data ? data.event_name : "Event Name"}
                      </Text>
                      <Text style={styles.EventAttend}>
                        {data ? data.address : "Address"}
                      </Text>
                    </View>
                    <View style={styles.earningCredits}>
                      <Text style={styles.creditText}>
                        {data ? data.start_time : "12:00 PM"}
                      </Text>
                      <Text style={styles.creditNumber}>
                        {data ? data.event_date : "02/02/2021"}
                      </Text>
                    </View>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            ))
          : null}
        {/* <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        overScrollMode={'never'}
        style={{zIndex: 10}}
        scrollEventThrottle={16}
        onScroll={Animated.event([
          {
            nativeEvent: {contentOffset: {y: scrollY}},
          },
        ])}
        bounces={false}>
        <FlatList
          ListHeaderComponent={headerList}
          style={styles.container}
          data={data}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          showsVerticalScrollIndicator={false}
          bounces={false}
        />
      </Animated.ScrollView> */}
        {/* <AdMobBanner
        adSize="fullBanner"
        adUnitID={adsBannerId}
        onAdFailedToLoad={error => console.error(error)}
      /> */}
      </ScrollView>
    </View>
  );
});

export default EvezNews;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  mainCard: {
    width: "95%",
    marginTop: height_screen * 0.01,
    flexDirection: "row",
    padding: "3%",
    borderRadius: 10,
    alignSelf: "center",
  },
  earningDetails: {
    width: "70%",
    fontFamily: FONTS.Regular,
  },
  earningCredits: {
    width: "30%",
    fontFamily: FONTS.Regular,
  },
  EventName: {
    color: "#fff",
    fontFamily: FONTS.Regular,
  },
  EventName2: {
    color: "#fff",
    fontFamily: FONTS.Regular,
    textAlign: "center",
    marginTop: "1%",
  },
  EventAttend: {
    fontFamily: FONTS.Regular,
    color: "#fff",
    fontSize: 13,
  },
  creditText: {
    fontFamily: FONTS.Regular,
    textAlign: "center",
    color: "#fff",
    fontSize: 13,
  },
  creditNumber: {
    fontFamily: FONTS.Regular,
    textAlign: "center",
    color: "#fff",
    fontSize: 13,
  },
});
