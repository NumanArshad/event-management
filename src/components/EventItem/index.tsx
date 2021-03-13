import React, { memo, useCallback, useEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import IconUnSave from "svgs/IconUnSave";
import FONTS from "ultis/fonts";
import HourGlass from "svgs/HourGlass";
import { width_screen } from "ultis/dimensions";
import EventName from "components/EventItem/EventName";
import EventBasicInfo from "components/EventItem/EventBasicInfo";
import ROUTES from "ultis/routes";
import { useNavigation } from "@react-navigation/native";
import SvgSaved from "svgs/IconSaved";
import { saveEvent, unSaveEvent } from "redux/events/events.actions";
import { useDispatch, useSelector } from "react-redux";
import EventTimeCountDown from "components/EventTimeCountDown";
import { compareDateTime, formatDateTime, isEventInProgress } from "ultis/functions";
import dayjs from "dayjs";
import CustomSkeleton from "components/SkeletonPlaceholder";

interface EventItemProps {
  thumbnail: any;
  id?: number;
  tag?: string[];
  reviewTimes?: number;
  eventName: string;
  location: string;
  distance: string;
  currentAttending?: number;
  rate?: number;
  marginLeft?: number;
  onPress?: () => void;
  eventDateTime?: string;
  duration?: string;
  colorAttending?: string;
  isSmallItem?: boolean;
  loadFlag?: boolean;
}

const EventItem = memo((props: EventItemProps) => {
  const [isSave, setSave] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { all_saved_events } = useSelector((state) => state.events);

  useEffect(() => {
    const isEventSaved = all_saved_events?.find(
      ({ event_id }: { event_id: number }) => event_id === props.id
    );
    setSave(!!isEventSaved);
  }, [all_saved_events, props]);

  const onPressSave = useCallback(() => {
    setSave(!isSave);
    if (!isSave) {
      dispatch(saveEvent(props.id));
    } else {
      dispatch(unSaveEvent(props.id));
    }
  }, [isSave]);

  const thumbnailDimension = {
    width: props.isSmallItem ? "100%" : (327 / 375) * widthScreen,
    height: props.isSmallItem ? 220 * (375 / 327) * 0.7 : 220 * (375 / 327),
  };

  const data = {
    thumbnail: require("@assets/Trending/trending_1.png"), //props.thumbnail,
    tag: props.tag || "",
    id: props.id || "",
    reviewTimes: props.reviewTimes || "",
    eventName: props.eventName,
    location: props.location,
    distance: props.distance,
    currentAttending: props.currentAttending || 0,
    rate: props.rate || 0,
  };

  const onDetail = useCallback(() => {
    navigation.navigate(ROUTES.EventDetail, {
      data,
    });
  }, []);

  return (
    <TouchableOpacity
      style={[
        styles.itemContainer,
        {
          marginLeft: props.marginLeft ? props.marginLeft : 0,
          width: props.isSmallItem ? width_screen * 0.7 : width_screen - 48,
        },
      ]}
      onPress={onDetail}
      activeOpacity={0.8}
    >
      
      <View style={styles.viewThumbnail}>
        <CustomSkeleton loadFlag={props.loadFlag}>
          <Image
            source={{uri:props.thumbnail}}
            style={[styles.thumbnail, thumbnailDimension]}
          />
        </CustomSkeleton>

        {!props.isSmallItem && (
          <TouchableOpacity style={styles.iconUnSave} onPress={onPressSave}>
            {isSave ? <SvgSaved /> : <IconUnSave />}
          </TouchableOpacity>
        )}

       {
          !props.isSmallItem && (
            <EventTimeCountDown
              eventDateTime={props.eventDateTime}
              id={props.id}
              loadFlag={props.loadFlag}
              hasPassed={!compareDateTime(props.eventDateTime)?.isAfter }
              isInProgress={isEventInProgress(props.eventDateTime, props?.duration)}
            />
          )}
      </View>

      <EventName
        tag={props.tag}
        eventName={props.eventName}
        rate={props.rate}
        reviewTimes={props.reviewTimes}
        isSmallItem={props.isSmallItem}
        loadFlag={props.loadFlag}
      />
      <EventBasicInfo
        currentAttending={props.currentAttending}
        location={props.location}
        distance={props.distance}
        eventDateTime={props.eventDateTime}
        eventId={props.id}
        duration={props.duration}
        isSmallItem={props.isSmallItem}
        loadFlag={props.loadFlag}
        hasPassed={props.hasPassed}
        isInProgress={props.isInProgress}
      />
    </TouchableOpacity>
  );
});

export default EventItem;
const widthScreen = Dimensions.get("window").width;
const styles = StyleSheet.create({
  itemContainer: {
    marginBottom: 36,
  },
  textReviewTimes: {
    fontSize: 14,
    color: "#353B48",
    marginLeft: 8,
    fontFamily: FONTS.Regular,
  },
  rateView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
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
    justifyContent: "space-between",
    width: "100%",
  },
  viewThumbnail: {
    alignItems: "center",
  },
  thumbnail: {
    justifyContent: "flex-end",
    flexDirection: "row",
    borderRadius: 10,
  },
  iconUnSave: {
    position: "absolute",
    right: 18,
    top: 18,
  },
  textEventName: {
    fontSize: 18,
    fontWeight: "500",
    lineHeight: 27,
    marginTop: 12,
    fontFamily: FONTS.Medium,
  },
  location: {
    flexDirection: "row",
    marginTop: 8,
    justifyContent: "space-between",
  },
  textLocation: {
    marginLeft: 8,
    fontSize: 14,
    color: "#7F8FA6",
    fontFamily: FONTS.Regular,
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  viewAttending: {
    flexDirection: "row",
  },
  avatar: {
    width: 18,
    height: 18,
    marginLeft: -8,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: "#F2F2F2",
  },
  labelCountDown: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    height: 34 * (375 / 327),
    width: (327 / 375) * widthScreen,
    alignItems: "center",
    backgroundColor: "#1DA1F2",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    paddingHorizontal: 16,
  },
  textCountDown: {
    fontSize: 12,
    fontFamily: FONTS.Regular,
    color: "#fff",
    marginLeft: 8,
  },
});
