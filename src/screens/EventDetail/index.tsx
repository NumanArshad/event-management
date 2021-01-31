import React, { memo, useCallback, useRef, useState, useEffect } from "react";
import {
  Animated,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Swiper from "react-native-swiper";
import { width_screen } from "ultis/dimensions";
import FONTS from "ultis/fonts";
import { useRoute, useNavigation } from "@react-navigation/native";
import EventName from "components/EventItem/EventName";
import EventBasicInfo from "components/EventItem/EventBasicInfo";
import RateDetail from "components/RateDetail";
import SvgArrowRight from "svgs/EventDetail/SvgArrowRight";
import UserItem from "components/UserItem";
import {
  getBottomSpace,
  getStatusBarHeight,
} from "react-native-iphone-x-helper";
import EventItem from "components/EventItem";
import ButtonLinear from "components/buttons/ButtonLinear";
import HourGlass from "svgs/HourGlass";
import SvgArrowBack from "svgs/EventDetail/SvgArrowBack";
import IconShare from "svgs/IconShare";
import IconUnSave from "svgs/IconUnSave";
import SvgSaved from "svgs/IconSaved";
import ROUTES from "ultis/routes";
import MapLocation from "screens/EventDetail/components/MapLocation";
import LocationView from "screens/EventDetail/components/LocationView";
import { LinearGradient } from "expo-linear-gradient";
import ThemeUtils from "ultis/themeUtils";
import { useDispatch, useSelector } from "react-redux";
import {
  clearSingleEvent,
  getSingleEventDetail,
} from "redux/events/events.actions";
import { clearEventAllReviews } from "redux/reviews/reviews.actions";
import isEmpty from "ultis/isEmpty";

const EventDetail = memo(() => {
  const route = useRoute();
  const navigation = useNavigation();

  // @ts-ignore
  const data = route.params?.data;

  const dispatch = useDispatch();

  const { single_event } = useSelector<any, any>((state) => state.events);

  useEffect(() => {
    dispatch(getSingleEventDetail(data?.id));

    return () => {
      dispatch(clearSingleEvent());
      dispatch(clearEventAllReviews());
    };
  }, [dispatch]);

  const [isSaved, setSaved] = useState(data.save);
  let textBuyButton = "";
  let isAvailable;
  // if (data.currentAttending < data.maxAttending) {
  isAvailable = true;
  if (data.price && data.price > 0) {
    textBuyButton = `FROM $${data.price} - GET IT`;
  } else {
    textBuyButton = "JOIN IT FREE";
  }
  //}
  // else {
  //   textBuyButton = "The list is full. Please select other time";
  //   isAvailable = false;
  // }
  const onSaved = useCallback(() => {
    setSaved(!isSaved);
  }, [isSaved]);
  const onBack = useCallback(() => {
    navigation.goBack();
  }, []);
  const onBuy = useCallback(() => {
    navigation.navigate(ROUTES.TicketDetail);
  }, []);
  const onDirection = useCallback(() => {
    navigation.navigate(ROUTES.EventDetailMap);
  }, []);
  const onReview = useCallback(() => {
    navigation.navigate(ROUTES.EventDetailRateComment, {
      eventId: data?.id,
    });
  }, [navigation]);

  const scrollY = useRef(new Animated.Value(0)).current;

  const headerHeight = scrollY.interpolate({
    inputRange: [0, 176],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });
  //console.log("event det", single_event);
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        bounces={false}
        onScroll={Animated.event([
          { nativeEvent: { contentOffset: { y: scrollY } } },
        ])}
      >
        <Swiper
          containerStyle={styles.swiperStyle}
          dotColor={"rgba(255,255,255,0.5)"}
          activeDotColor={"#fff"}
        >
          <View>
            <Image source={data.thumbnail} style={styles.thumbnail} />
          </View>
          <View>
            <Image source={data.thumbnail} style={styles.thumbnail} />
          </View>
          <View>
            <Image source={data.thumbnail} style={styles.thumbnail} />
          </View>
          <View>
            <Image source={data.thumbnail} style={styles.thumbnail} />
          </View>
        </Swiper>

        {/* 7 Days 06 Hours 27 Mins 44 secs */}
        {data.timeCountDown !== "" ? (
          <View style={styles.countDownView}>
            <HourGlass />
            <Text style={styles.textCountDown}>{data.timeCountDown}</Text>
          </View>
        ) : null}
        {isEmpty(single_event) ? (
          <Text>...loading</Text>
        ) : (
          <View style={styles.infoView}>
            <EventName
              eventName={single_event.event_name}
              //rate={single_event?.rating}
              tag={single_event?.type_name}
            />
            <EventBasicInfo
              currentAttending={single_event?.participants}
              eventTime={`${single_event?.event_date} - ${single_event?.start_time}-duration: ${single_event?.duration}`}
            />
          </View>
        )}
        <RateDetail
          eventId={data?.id}
          onPress={onReview}
          rate={single_event?.rating}
          // reviewTimes={12}
          marginTop={32}
          numberReviews={214}
        />
        {/* <View style={styles.contentView}>
          <Text style={styles.textTitle}>ABOUT</Text>
          <Text style={styles.aboutContent}>
            Why this party is for you {"\n"}
            Let’s play the silent game, but this time you have to dance under
            the stars with hundreds…
          </Text>
          <View style={styles.flexEnd}>
            <TouchableOpacity style={styles.detailAboutBtn}>
              <Text style={styles.textBtn}>Detail</Text>
              <SvgArrowRight />
            </TouchableOpacity>
          </View>
        </View> */}

        {single_event && (
          <>
            <View style={styles.contentViewNoPadding}>
              <Text style={[styles.textTitle, { paddingHorizontal: 24 }]}>
                ENDORSE
              </Text>
              <UserItem
                image={require("@assets/Followers/img.jpg")}
                user_name={single_event?.sub_type_name}
                //   user_type = {single_event?.type_name}
                // numberFollower={"535"}
              />
            </View>

            <View style={styles.contentViewNoPadding}>
              <View style={styles.locationContainer}>
                <View
                  style={[styles.flexRow, { justifyContent: "space-between" }]}
                >
                  <Text style={styles.textTitle}>LOCATION</Text>
                  <TouchableOpacity
                    style={styles.detailAboutBtn}
                    onPress={onDirection}
                  >
                    <Text style={styles.textBtn}>How to get there?</Text>
                    <SvgArrowRight />
                  </TouchableOpacity>
                </View>
                <LocationView
                  location={single_event?.address}
                  distance={single_event?.lat_long}
                />
              </View>
              <MapLocation eventLocation={single_event?.lat_long} />
            </View>
          </>
        )}
        {/* <View style={styles.contentView}>
          <Text style={styles.textTitle}>CONTACT</Text>
          <Text style={styles.aboutContent}>
            Send us an email at{" "}
            <Text style={styles.textBtn}>help@evez.com</Text> or call us at{" "}
            {"\n"}
            <Text style={styles.textBtn} numberOfLines={1}>
              +1 991-682-0200
            </Text>
          </Text>
        </View>
        <View style={styles.contentViewNoPadding}>
          <Text style={[styles.textTitle, { paddingHorizontal: 24 }]}>
            SIMILAR EVENT
          </Text>
          <ScrollView
            style={styles.scrollHorizontal}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            <EventItem
              thumbnail={require("@assets/mask.png")}
              tag={["#art", "#festival"]}
              reviewTimes={1.3}
              eventName={"The Gazillion Bubble Show"}
              location={"3 South Sherman Street…"}
              distance={15}
              currentAttending={19}
              // maxAttending={5000}
              save={false}
              rate={4.5}
              marginLeft={24}
              isSmallItem={true}
            />
            <EventItem
              thumbnail={require("@assets/book.png")}
              tag={["#culture"]}
              reviewTimes={1.3}
              eventName={"A Bronx Tale The Musical - Broadway"}
              location={"Tobacco Dock, London"}
              distance={15}
              currentAttending={19}
              //   maxAttending={5000}
              save={false}
              rate={4.5}
              marginLeft={24}
              isSmallItem={true}
            />
          </ScrollView>
        </View> */}

        <View style={styles.buttonView}>
          {isAvailable ? (
            <ButtonLinear
              title={textBuyButton}
              style={styles.bottomButton}
              onPress={onBuy}
            />
          ) : (
            <View style={styles.buttonSoldOut}>
              <Text style={styles.textSoldOut}>{textBuyButton}</Text>
            </View>
          )}
        </View>
      </ScrollView>
      <View style={styles.buttonTopView}>
        <TouchableOpacity onPress={onBack} style={styles.btnBack}>
          <SvgArrowBack />
        </TouchableOpacity>
        <View style={styles.flexRow}>
          <TouchableOpacity>
            <IconShare />
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonSave} onPress={onSaved}>
            {isSaved ? <SvgSaved /> : <IconUnSave />}
          </TouchableOpacity>
        </View>
      </View>
      <Animated.View style={[styles.header, { opacity: headerHeight }]}>
        <LinearGradient
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 1 }}
          style={styles.linear}
          colors={["#ED3269", "#F05F3E"]}
        />
      </Animated.View>
    </View>
  );
});

export default EventDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    paddingBottom: getBottomSpace() + 16,
  },
  textTag: {
    fontSize: 14,
    color: "#7F8FA6",
    marginRight: 8,
    fontFamily: FONTS.Regular,
  },
  tagRateView: {
    flexDirection: "row",
    marginTop: 16,
    width: width_screen - 48,
    backgroundColor: "green",
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoView: {
    alignItems: "center",
    flex: 1,
    paddingHorizontal: 24,
  },
  contentView: {
    marginTop: 24,
    paddingHorizontal: 24,
  },
  contentViewNoPadding: {
    marginTop: 24,
  },
  textTitle: {
    fontFamily: FONTS.Medium,
    fontSize: 14,
    color: "#7F8FA6",
  },
  aboutContent: {
    lineHeight: 24,
    fontSize: 14,
    fontFamily: FONTS.Regular,
    color: "#353B48",
    marginTop: 16,
  },
  detailAboutBtn: {
    flexDirection: "row",
    alignItems: "center",
  },
  textBtn: {
    color: "#ED3269",
    fontFamily: FONTS.Regular,
    fontSize: 14,
  },
  flexEnd: {
    alignItems: "flex-end",
  },
  swiperStyle: {
    width: width_screen,
    height: 252 * (width_screen / 375),
  },
  thumbnail: {
    width: width_screen,
    height: 252 * (width_screen / 375),
  },
  textLocation: {
    fontSize: 16,
    fontFamily: FONTS.Medium,
    color: "#353B48",
    lineHeight: 20,
    marginTop: 8,
  },
  locationContainer: {
    paddingHorizontal: 24,
  },

  buttonView: {
    width: "100%",
    marginTop: 15,
    paddingHorizontal: "6.4%",
  },
  bottomButton: {
    height: 50,
    borderRadius: 100,
  },
  scrollHorizontal: {
    marginTop: 16,
  },
  buttonSoldOut: {
    height: 50,
    borderRadius: 100,
    backgroundColor: "#F7F8FA",
    justifyContent: "center",
    alignItems: "center",
  },
  textSoldOut: {
    fontFamily: FONTS.Medium,
    fontSize: 14,
    color: "#7F8FA6",
  },
  countDownView: {
    backgroundColor: "#1DA1F2",
    height: 34 * (width_screen / 375),
    paddingHorizontal: 24,
    flexDirection: "row",
    alignItems: "center",
  },
  textCountDown: {
    fontSize: 12,
    fontFamily: FONTS.Regular,
    color: "#fff",
    marginLeft: 8,
  },
  buttonTopView: {
    zIndex: 99,
    position: "absolute",
    paddingTop: getStatusBarHeight(),
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingRight: 24,
    paddingBottom: 16,
    alignItems: "flex-end",
    height: ThemeUtils.APPBAR_HEIGHT + getStatusBarHeight(true),
  },
  buttonSave: {
    marginLeft: 32,
  },
  btnBack: {
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 24,
  },
  linear: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    width: width_screen,
    position: "absolute",
    top: 0,
    left: 0,
    height: ThemeUtils.APPBAR_HEIGHT + getStatusBarHeight(true),
  },
});
