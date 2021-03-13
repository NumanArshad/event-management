import React, { memo, useCallback, useEffect, useState } from "react";
import {
  Animated,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { height_screen, width_screen } from "ultis/dimensions";
import { LinearGradient } from "expo-linear-gradient";
import FONTS from "ultis/fonts";
import SvgArrDown from "svgs/SvgArrDown";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import ROUTES from "ultis/routes";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { alertMessage } from "ultis/alertToastMessages";
import { useDispatch, useSelector } from "react-redux";
import store from "redux/store";
import { getMyEarning } from "redux/users/users.actions";
import { ScrollView } from "react-native-gesture-handler";
import COLOR from "ultis/color/index";
import { getImage } from "ultis/functions";
interface Props {
  coverImage: any;
  avatar: any;
  userName: string;
  address: string;
  numberMessage: number;
  rewards: number;
  followers: string;
  following: number;
  interested: string[];
  notification: number;
}

const HeaderProfile = memo((props: Props) => {
  const navigation = useNavigation();
  const [earnings, setearnings] = useState("");
  const onInbox = useCallback(() => {
    navigation.navigate(ROUTES.Inbox);
  }, [navigation]);
  const onProfile = useCallback(() => {
    navigation.navigate(ROUTES.Profile);
  }, [navigation]);
  const onRewards = useCallback(() => {
    navigation.navigate(ROUTES.Rewards);
  }, [navigation]);
  const onFollower = useCallback(() => {
    navigation.navigate(ROUTES.TabFollowers);
  }, [navigation]);
  const onFollowing = useCallback(() => {
    navigation.navigate(ROUTES.TabFollowers);
  }, [navigation]);
  const spin = new Animated.Value(0);
  const rotateInterPolate = spin.interpolate({
    inputRange: [0, 360],
    outputRange: ["0deg", "360deg"],
  });

  const dispatch = useDispatch();
  const { my_earnings } = useSelector<any, any>((state) => state.users);

  useEffect(() => {
    if (Array.isArray(my_earnings) && my_earnings.length > 0) {
      // makeRow();
    } else {
      dispatch(getMyEarning());
      //   console.log("Run", my_earnings);
    }
  }, [dispatch, my_earnings]);

  const startAnimation = useCallback(() => {
    Animated.timing(spin, {
      toValue: 180,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [spin]);
  const animatedStyles = { transform: [{ rotate: rotateInterPolate }] };
  return (
    <>
      <Image style={styles.coverImage} source={props.coverImage} />
      <LinearGradient
        style={styles.linear}
        colors={["rgba(1, 1, 1, 0.0001)", "#000"]}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 1 }}
      />
      <View style={styles.mask}>
        <Image style={styles.img} source={{uri:getImage(props.avatar)}} />
        <Ionicons
          name="create-outline"
          size={18}
          color="black"
          style={styles.iconEdit}
          onPress={onProfile}
        />
        <Text style={styles.userName}>
          {props.userName}
          {/* <Ionicons name="create-outline" size={20} color="black" /> */}
        </Text>
        <Text style={styles.address}>{props.address}</Text>
        <View style={styles.btn}>
          <TouchableOpacity
            // onPress={onInbox}
            onPress={() => alertMessage("Working...")}
            style={styles.inbox}
          >
            <Text style={styles.txtInbox}>INBOX</Text>
            <View style={styles.numberMessage}>
              <Text style={styles.txtNumberMessage}>{props.numberMessage}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={onRewards} style={styles.rewards}>
            <Text style={styles.txtRewards}>REWARD - ${props.rewards}</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={{ flex: 1, height: 400 }}>
          {Array.isArray(my_earnings) && my_earnings.length > 0
            ? my_earnings.map((data, id) => (
                <LinearGradient
                  colors={[COLOR.GRAD_COLOR_3, COLOR.GRAD_COLOR_3]}
                  start={{ x: 0, y: 1 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.mainCard}
                >
                  <View style={styles.earningDetails}>
                    <Text style={styles.EventName}>
                      {data ? data.event_name : "Event Name"}
                    </Text>
                    <Text style={styles.EventAttend}>
                      {data ? data.earning_type : "Attendant"}
                    </Text>
                  </View>
                  <View style={styles.earningCredits}>
                    <Text style={styles.creditText}>Credits</Text>
                    <Text style={styles.creditNumber}>
                      {data ? data.earn_credits : "00"}
                    </Text>
                  </View>
                </LinearGradient>
              ))
            : null}
        </ScrollView>

        {/* <View style={styles.followStyle}>
          <TouchableOpacity onPress={onFollower}>
            <Text style={styles.followers}>
              {props.followers}
              <Text style={styles.txtFollow}> followers</Text>
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onFollowing}>
            <Text style={styles.txtNumberFollow}>
              {props.following}
              <Text style={styles.txtFollow}> following</Text>
            </Text>
          </TouchableOpacity>
        </View> */}
        {/* <Text style={styles.interested}>Interested in:</Text>
        <View style={styles.tagStyle}>
          {props.interested.map((item) => (
            <Text style={styles.txtInterested}>{item}</Text>
          ))}
        </View> */}
        {/* <TouchableOpacity onPress={startAnimation} style={styles.arrDown}>
          <Animated.View style={animatedStyles}>
            <SvgArrDown />
          </Animated.View>
        </TouchableOpacity> */}
      </View>
    </>
  );
});

export default HeaderProfile;

const styles = StyleSheet.create({
  headerProfile: {
    backgroundColor: "#FFF",
  },
  coverImage: {
    width: width_screen,
    height: 0.31 * height_screen,
    marginTop: "-0.1%",
  },
  linear: {
    width: width_screen,
    height: 0.31 * height_screen,
    position: "absolute",
    opacity: 0.4,
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: { width: 0, height: 4 },
  },
  icon: {
    position: "absolute",
    flexDirection: "row",
    marginTop: getStatusBarHeight() + 10,
    alignItems: "center",
    alignSelf: "flex-end",
    width: 0.22 * width_screen,
    justifyContent: "space-between",
    height: 50,
    right: 8,
  },
  mask: {
    width: 0.87 * width_screen,
    height: 400,
    backgroundColor: "#FFF",
    alignSelf: "center",
    marginTop: -0.06 * height_screen,
    borderRadius: 10,
    shadowColor: "rgba(0, 0, 0, 0.08)",
    shadowOffset: { width: 5, height: 10 },
    shadowOpacity: 0.3,
    marginBottom: 32,
  },
  img: {
    width: 104,
    height: 104,

    borderRadius: 100,
    borderColor: "rgba(255, 255, 255, 0.4)",
    marginTop: -0.06 * height_screen,
    overflow: "hidden",
    alignSelf: "center",
  },
  userName: {
    fontFamily: FONTS.Medium,
    fontSize: 16,
    color: "#353B48",
    marginTop: 16,
    marginBottom: 7,
    alignSelf: "center",
  },
  address: {
    fontFamily: FONTS.Regular,
    fontSize: 14,
    color: "#7F8FA6",
    alignSelf: "center",
  },
  inbox: {
    width: 88,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#7F8FA6",
    borderRadius: 100,
  },
  rewards: {
    width: 142,
    height: 40,
    backgroundColor: COLOR.GRAD_COLOR_3,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    alignItems: "center",
    height: 0.1 * height_screen,
    borderBottomWidth: 1,
    borderBottomColor: "#F7F8FA",
  },
  txtInbox: {
    fontFamily: FONTS.Medium,
    fontSize: 12,
    color: "#7F8FA6",
  },
  txtRewards: {
    fontFamily: FONTS.Medium,
    fontSize: 12,
    color: "#FFF",
  },
  numberMessage: {
    height: 16,
    width: 16,
    borderRadius: 8,
    backgroundColor: COLOR.GRAD_COLOR_3,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    right: 6,
    top: -8,
  },
  txtNumberMessage: {
    fontFamily: FONTS.Medium,
    fontSize: 12,
    color: "#FFF",
  },
  followStyle: {
    flexDirection: "row",
    marginLeft: 30,
    fontFamily: FONTS.Medium,
    fontSize: 14,
    color: "#353B48",
    marginTop: 16,
  },
  followers: {
    marginRight: 40,
  },
  txtFollow: {
    fontFamily: FONTS.Regular,
    fontSize: 12,
    color: "#7F8FA6",
  },
  txtNumberFollow: {
    fontFamily: FONTS.Medium,
    fontSize: 14,
    color: "#353B48",
  },
  interested: {
    fontFamily: FONTS.Regular,
    fontSize: 12,
    color: "#7F8FA6",
    marginLeft: 30,
    marginTop: 16,
  },
  tagStyle: {
    flexDirection: "row",
    marginLeft: 30,
    marginTop: 8,
  },
  txtInterested: {
    fontFamily: FONTS.Regular,
    fontSize: 14,
    color: "#353B48",
    marginRight: 8,
  },
  arrDown: {
    alignSelf: "flex-end",
    marginRight: 24,
    bottom: 24,
    height: 30,
    width: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  iconEdit: {
    position: "absolute",
    top: height_screen * 0.05,
    left: width_screen * 0.48,
    backgroundColor: "white",
    height: height_screen * 0.04,
    width: width_screen * 0.08,
    borderRadius: 100,
    padding: "15%",
  },
  mainCard: {
    width: "100%",
    marginTop: height_screen * 0.01,
    flexDirection: "row",
    padding: "3%",
    borderRadius: 10,
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
  EventAttend: {
    fontFamily: FONTS.Regular,
    color: "#fff",
  },
  creditText: {
    fontFamily: FONTS.Regular,
    textAlign: "center",
    color: "#fff",
  },
  creditNumber: {
    fontFamily: FONTS.Regular,
    textAlign: "center",
    color: "#fff",
  },
});
