import React, { memo, useCallback, useEffect, useState } from "react";
import { Alert, Dimensions, Image, StyleSheet, Text, View } from "react-native";
import FONTS from "ultis/fonts";
import HourGlass from "svgs/HourGlass";
import dayjs from "dayjs";
import { getEventTimeDown } from "ultis/functions";
import CustomSkeleton from "components/SkeletonPlaceholder";
import { width_screen } from "ultis/dimensions";

interface EventItemProps {
  id?: number;
  onPress?: () => void;
  eventDateTime?: string;
  isSmallItem?: boolean;
  isDetail?: ViewStyle;
  loadFlag?: boolean;
  hasPassed?: boolean;
  isInProgress?: boolean;
}

const EventTimeCountDown = memo((props: EventItemProps) => {
  const countDownDimension = {
    width: props.isSmallItem ? "100%" : (327 / 375) * widthScreen,
    height: props.isSmallItem ? 34 * (375 / 327) * 0.7 : 34 * (375 / 327),
  };

  const [timeCountData, setCountDown] = useState({
    days: "",
    hours: "",
    minutes: "",
    seconds: "",
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const { days, hours, minutes } = getEventTimeDown(props.eventDateTime);
      //@ts-ignore
      setCountDown((prev) => ({
        days,
        hours,
        minutes,
        seconds,
      }));
    }, 60000);

    return () => {
      clearInterval(interval);
    };
  }, [props?.id, props?.eventDateTime]);

  const { days, hours, minutes, seconds } = timeCountData;

  return (
    <View style={props.isDetail || [styles.labelCountDown, countDownDimension]}>
      <CustomSkeleton
        style={{ width: width_screen * 0.4, height: 15 }}
        loadFlag={props.loadFlag}
      >
        <HourGlass />
        <Text style={styles.textCountDown}>
          {props.isInProgress ? (
            `Event has started`
          ) : props.hasPassed ? (
            `Event has passed`
          ) : (
            <>
              {`${days ? days : ``} ${
                !days ? `` : days === 1 ? `day` : `days`
              } ${hours} hours ${minutes} minutes`}
            </>
          )}
        </Text>
      </CustomSkeleton>
    </View>
  );
});

export default EventTimeCountDown;

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
