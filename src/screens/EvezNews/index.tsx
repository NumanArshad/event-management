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
// import HeaderEvezNew from "screens/EvezNews/components/HeaderEvezNew";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import ROUTES from "ultis/routes";
import CalendarPicker from "react-native-calendar-picker";
import { useDispatch, useSelector } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import { height_screen } from "ultis/dimensions";
import FONTS from "ultis/fonts";
import { ScrollView } from "react-native-gesture-handler";
import { getAllReservedEvents } from "redux/events/events.actions";
import dayjs from "dayjs";
import Color from "ultis/color";

const EvezNews = memo(() => {
  const navigation = useNavigation();
  const [dateChange, setdateChange] = useState("");
  const [listDate, setlistDate] = useState("");
  const [checkEvent, setcheckEvent] = useState("");
  
  const dispatch = useDispatch();
  const { all_reserved_events } = useSelector<any, any>(
    (state) => state.events
  );

  const getDateConsole = (date) => {
    const d = dayjs(date).format("MM/DD/YYYY"); //02/14/2021
    //console.log("DATE ", d);
    setdateChange(d);
    const result = all_reserved_events?.filter(
      (event) => event.event_date.toString() === d
    );
    //  console.log("RESULT ON CLICK", result);
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
      data: { id },
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
              backgroundColor: Color.GRAD_COLOR_3,
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
          selectedDayColor={Color.GRAD_COLOR_3}
          textStyle={{
            fontSize: 16,
            lineHeight: 60,
          }}
          weekdays={["S", "M", "T", "W", "T", "F", "S"]}
          todayBackgroundColor={Color.GRAD_COLOR_3}
          // nextTitle={rightIcon}
          // previousTitle={lefttIcon}
          dayLabelsWrapper={{ borderTopWidth: 0, borderBottomWidth: 0 }}
          customDatesStyles={listDate}
        />

        {Array.isArray(checkEvent) && checkEvent.length > 0
          ? checkEvent.map((data, id) => (
              <TouchableOpacity onPress={() => onDetail(data.event_id)}>
                <LinearGradient
                  colors={[Color.GRAD_COLOR_3, Color.GRAD_COLOR_3]}
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
