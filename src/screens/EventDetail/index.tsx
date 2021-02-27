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
import ButtonLinear from "components/buttons/ButtonLinear";
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
  reserveEvent,
  saveEvent,
  unReserveEvent,
  unSaveEvent,
} from "redux/events/events.actions";
import { clearEventAllReviews } from "redux/reviews/reviews.actions";
import isEmpty from "ultis/isEmpty";
import {
  compareDateTime,
  formatDateTime,
  isEventInProgress,
} from "ultis/functions";
import EventTimeCountDown from "components/EventTimeCountDown";
import { markAttendance } from "redux/attendEvent/attendEvent.actions";
import {currentLat, currentLong} from "ultis/functions"
import CustomSkeleton from "components/SkeletonPlaceholder";

const EventDetail = memo(() => {
  const route = useRoute();
  const navigation = useNavigation();
  
  // @ts-ignore
  const data = route.params?.data;

  const dispatch = useDispatch();
  const [isSaved, setSaved] = useState(data.save);

  const { single_event, all_reserved_events, all_saved_events } = useSelector<
    any,
    any
  >((state) => state.events);

  const { loading } = useSelector<any, any>((state) => state.loading);

  useEffect(() => {
    dispatch(getSingleEventDetail(data?.id));
    const isEventSaved = all_saved_events?.find(
      ({ event_id }: { event_id: number }) => event_id === data?.id
    );
    setSaved(!!isEventSaved);
  }, [dispatch, all_saved_events, data]);

  useEffect(() => {
    return () => {
      dispatch(clearSingleEvent());
      dispatch(clearEventAllReviews());
    };
  }, [dispatch]);

  const isEventReservedByUser = () => {
    return all_reserved_events?.find(
      ({ event_id }: { event_id: number }) => event_id === data?.id
    );
  };

  const handleReserveAttendEvent = () => {
    const formData = new FormData();
    formData.append("event_id", data?.id);
    formData.append("lat", currentLat);
    formData.append("long", currentLong);
    is_event_in_progress
      ? dispatch(markAttendance(formData))
      : handleReserveEvent();
  };

  const handleReserveEvent = () => {
    dispatch(
      isEventReservedByUser()
        ? unReserveEvent(data?.id)
        : reserveEvent(data?.id)
    );
  };

  const onBack = useCallback(() => {
    navigation.goBack();
  }, []);

  const handleSavedEvent = () => {
    setSaved(!!isSaved);
    dispatch(isSaved ? unSaveEvent(data?.id) : saveEvent(data?.id));
  };

  const onDirection = useCallback(() => {
    navigation.navigate(ROUTES.EventDetailMap,{
      eventLocation: single_event?.lat_long
    });
  }, [single_event]);

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

  const { isAfter } = compareDateTime(
    single_event &&
      formatDateTime(single_event?.event_date, single_event?.start_time)
  ) || {};

  const is_event_in_progress = single_event && isEventInProgress(
     formatDateTime(single_event?.event_date, single_event?.start_time),
      single_event?.duration
    )
  
  const handleNavGroupShare = () => {
    navigation.navigate(ROUTES.TabSearchEvents, {
      eventShare: true,
    });
  };

  const reserveAttendanceText =
      loading || isEmpty(single_event)
      ? `...loading`
      : isAfter
      ? isEventReservedByUser()
        ? `Unreserve`
        : `Reserve`
      : is_event_in_progress
      ? `Attend Event`
      : null;

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
            <Image source={data?.thumbnail} style={styles.thumbnail} />
          </View>
          <View>
            <Image source={data?.thumbnail} style={styles.thumbnail} />
          </View>
          <View>
            <Image source={data?.thumbnail} style={styles.thumbnail} />
          </View>
          <View>
            <Image source={data?.thumbnail} style={styles.thumbnail} />
          </View>
        </Swiper>

        {/* 7 Days 06 Hours 27 Mins 44 secs */}
        {/* {data?.timeCountDown !== "" ? (
          <View style={styles.countDownView}>
            <HourGlass />
            <Text style={styles.textCountDown}>{data.timeCountDown}</Text>
          </View>
        ) : null} */}

        {/* {isEmpty(single_event) ? (
          <Text>...loading</Text>
        ) : (
          <> */}
            { (!isEmpty(single_event) || isAfter) && (
              <EventTimeCountDown
                id={data?.id}
                eventDateTime={formatDateTime(
                  single_event?.event_date,
                  single_event?.start_time
                ) }
                isDetail={styles.countDownView}
              //  loadFlag={isEmpty(single_event)}
              />
            )}

            <View style={styles.infoView}>
              <EventName
                eventName={single_event?.event_name}
                tag={single_event?.type_name}
                loadFlag={isEmpty(single_event)}
              />
              <EventBasicInfo
                eventId={data?.id}
                currentAttending={single_event?.participants || 0}
                distance={single_event?.lat_long || ''}
                eventDateTime={!isEmpty(single_event) && `${single_event?.event_date} - ${single_event?.start_time}-duration: ${single_event?.duration}`}
                loadFlag={isEmpty(single_event)}
              />
            </View>
          
       {single_event && 
         <RateDetail
          eventId={data?.id}
          onPress={onReview}
          rate={single_event?.rating}
          marginTop={32}
        />} 
     

        {single_event && (
          <>
            <View style={styles.contentViewNoPadding}>
              <CustomSkeleton>
              <Text style={[styles.textTitle, { paddingHorizontal: 24 }]}>
                ENDORSE
              </Text>
              </CustomSkeleton>
            
              <UserItem
                image={single_event?.image}
                user_name={single_event?.sub_type_name}
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
              {/* <MapLocation eventLocation={single_event?.lat_long} /> */}
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

        {(isEmpty(single_event) ||
          loading || isAfter ||
          is_event_in_progress) && (
          <View style={styles.buttonView}>
            <ButtonLinear
              title={reserveAttendanceText}
              style={styles.bottomButton}
              isDisabled={loading}
              onPress={handleReserveAttendEvent}
            />
          </View>
        )}
      </ScrollView>
      <View style={styles.buttonTopView}>
        <TouchableOpacity onPress={onBack} style={styles.btnBack}>
          <SvgArrowBack />
        </TouchableOpacity>
        <View style={styles.flexRow}>
          <TouchableOpacity onPress={handleNavGroupShare}>
            <IconShare/>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonSave}
            onPress={handleSavedEvent}
          >
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