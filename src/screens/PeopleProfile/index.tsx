import React, { memo } from "react";
import { Animated, StyleSheet, View } from "react-native";
import ThemeUtils from "ultis/themeUtils";
import Color from "ultis/color";
import ActivityItem from "screens/ProfileActivity/components/ActivityItem";
import {
  getBottomSpace,
  getStatusBarHeight,
} from "react-native-iphone-x-helper";
import data from "screens/PeopleProfile/datas";
import HeaderPeopleProfile from "screens/PeopleProfile/components/HeaderPeopleProfile";
import Header from "screens/PeopleProfile/components/Header";
import SvgChatOption from "svgs/PeopleProfile/SvgChatOption";
import { useRoute } from "@react-navigation/native";

const item = {
  coverImage: require("assets/PeopleProfile/img.png"),
  avatar: require("assets/PeopleProfile/Charlotte.png"),
  userName: "Numan",
  address: "Manhattan, NY",
  followers: "1.5M",
  following: 5,
  interested: ["#art", "#festival", "#fashion", "#expo…"],
};

const PeopleProfile = memo(() => {
  const scrollY = new Animated.Value(0);

  const { params } = useRoute();
  //console.log("user info paramsi ", params?.userInfo);

  const {
    user_name,
    image,
    user_id,
    id: user_doc_id,
    followers,
    following,
  } = params?.userInfo;

  return (
    <View style={styles.container}>
      <Header
        svgGoBack={true}
        onPress={() => null}
        svg={<SvgChatOption />}
        scrollY={scrollY}
        title={user_name}
      />
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        overScrollMode={"never"}
        style={{ zIndex: 10 }}
        scrollEventThrottle={16}
        onScroll={Animated.event([
          {
            nativeEvent: { contentOffset: { y: scrollY } },
          },
        ])}
        bounces={false}
      >
        <HeaderPeopleProfile
          coverImage={item.coverImage}
          avatar={item.avatar}
          userName={user_name}
          user_doc_id={user_doc_id}
          user_id={user_id}
          address={item.address}
          followers={followers}
          following={following}
          interested={item.interested}
        />
        {/* {data.map((item, index) => {
          const {
            typeActivity,
            time_Do_Activity,
            img,
            titlePost,
            timePost,
          } = item;
          return (
            <ActivityItem
              typeActivity={typeActivity}
              time_Do_Activity={time_Do_Activity}
              img={img}
              titlePost={titlePost}
              timePost={timePost}
              key={index}
            />
          );
        })} */}
      </Animated.ScrollView>
    </View>
  );
});
export default PeopleProfile;
const HEADER_IMAGE_HEIGHT = ThemeUtils.relativeHeight(30);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: getBottomSpace() + 5,
  },
  /*header style*/
  headerLeftIcon: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: ThemeUtils.relativeWidth(2),
  },
  headerRightIcon: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingRight: ThemeUtils.relativeWidth(2),
  },
  headerStyle: {
    paddingTop: getStatusBarHeight(true),
    height: ThemeUtils.APPBAR_HEIGHT + getStatusBarHeight(true),
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    zIndex: 100,
    position: "absolute",
  },
  headerTitle: {
    textAlign: "center",
    justifyContent: "center",
    color: Color.HEADER_TEXT_COLOR,
    fontSize: ThemeUtils.fontNormal,
    flex: 1,
  },
  /*Top Image Style*/
  headerImageStyle: {
    height: HEADER_IMAGE_HEIGHT,
    width: "100%",
    top: 0,
    alignSelf: "center",
    position: "absolute",
    zIndex: -1,
    backgroundColor: "blue",
  },
  /*profile image style*/
  profileImage: {
    position: "absolute",
    zIndex: 100,
  },
  /*profile title style*/
  profileTitle: {
    position: "absolute",
    zIndex: 100,
    textAlign: "center",
    color: Color.BLACK,
    top: ThemeUtils.relativeHeight(35),
    left: 0,
    right: 0,
    fontSize: ThemeUtils.fontXLarge,
  },
  /*song count text style*/
  songCountStyle: {
    position: "absolute",
    textAlign: "center",
    fontWeight: "400",
    top: ThemeUtils.relativeHeight(40),
    left: 0,
    right: 0,
    fontSize: ThemeUtils.fontNormal,
  },
  artistCardContainerStyle: {
    backgroundColor: Color.CARD_BG_COLOR,
    elevation: 5,
    shadowRadius: 3,
    shadowOffset: {
      width: 3,
      height: 3,
    },
    padding: 15,
    marginVertical: ThemeUtils.relativeWidth(1),
    marginHorizontal: ThemeUtils.relativeWidth(2),
    flexDirection: "row",
    alignItems: "center",
  },
  artistImage: {
    height: ThemeUtils.relativeWidth(15),
    width: ThemeUtils.relativeWidth(15),
    borderRadius: ThemeUtils.relativeWidth(7.5),
  },
  songTitleStyle: {
    fontSize: ThemeUtils.fontNormal,
    color: Color.BLACK,
  },
  cardTextContainer: {
    flex: 1,
    margin: ThemeUtils.relativeWidth(3),
  },
});
