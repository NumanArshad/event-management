import React, { memo, useCallback, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { width_screen } from "ultis/dimensions";
import InactiveRate from "components/inactiveRate";
import FONTS from "ultis/fonts";
import SvgUnlike from "svgs/EventDetailRateComment/SvgUnlike";
import SvgLike from "svgs/EventDetailRateComment/SvgLike";
import SvgReply from "svgs/EventDetailRateComment/SvgReply";
import SvgReport from "svgs/EventDetailRateComment/SvgReport";

interface CommentProps {
  // isLike: boolean;
  name: string;
  comment: string;
  userImage: string;
  // time: string;
  // numberReply: number;
  //numberLike: number;
  //rate: number;
}

const CommentItem = memo((props: CommentProps) => {
  //const [isLike, setLike] = useState(props.isLike);
  //const [numberLike, setNumLike] = useState(props.numberLike);
  //const [numReply, setNumReply] = useState(props.numberReply);

  // const onLike = useCallback(() => {
  //   if (isLike) {
  //     setNumLike(numberLike - 1);
  //   } else {
  //     setNumLike(numberLike + 1);
  //   }
  //   setLike(!isLike);
  // }, [isLike]);
  // const onReply = useCallback(() => {}, []);
  // const onReport = useCallback(() => {}, []);

  return (
    <ScrollView
      horizontal={true}
      pagingEnabled={true}
      showsHorizontalScrollIndicator={false}
    >
      <View style={styles.container}>
      <Image
          source={require("@assets/EventAroundU/avatar_1.png")}
         // source={{uri: props.userImage}}
          style={styles.bigAvatar}
        />
                <View style={styles.commentView}>
          <Text style={styles.textName}>{props.name}</Text>
          {/* <InactiveRate rate={props.rate} /> */}
          <Text style={styles.textComment}>{props.comment}</Text>
          {/* <View style={styles.timeView}>
            <Text style={styles.textTime}>{props.time}</Text>
            {props.numberReply > 0 ? (
              <Text style={styles.textTime}>{numReply} reply</Text>
            ) : null}
            <Text style={styles.textTime} onPress={onReply}>
              reply
            </Text>
          </View> */}
        </View>
        {/* <Text style={styles.textNumberLikes}>{numberLike}</Text>
        <TouchableOpacity
          style={styles.flexRow}
          onPress={onLike}
          activeOpacity={0.8}
        >
          {isLike ? <SvgLike /> : <SvgUnlike />}
        </TouchableOpacity> */}
      </View>
      {/* <View style={styles.optionView}>
        <TouchableOpacity style={styles.buttonOption} onPress={onReply}>
          <SvgReply />
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonOption} onPress={onReport}>
          <SvgReport />
        </TouchableOpacity>
      </View> */}
    </ScrollView>
  );
});

export default CommentItem;

const styles = StyleSheet.create({
  bigAvatar: {
    width: 32,
    height: 32,
    marginRight: 16,
    marginTop: 4,
    borderRadius: 32 / 2,
  },
  textTime: {
    fontSize: 12,
    fontFamily: FONTS.Regular,
    color: "#7F8FA6",
    lineHeight: 15,
    marginRight: 24,
  },
  container: {
    width: width_screen - 48,
    flexDirection: "row",
    marginBottom: 24,
    marginLeft: 24,
  },
  commentView: {
    flex: 1,
  },
  textName: {
    fontSize: 14,
    fontFamily: FONTS.Medium,
    color: "#353B48",
    lineHeight: 17,
    marginBottom: 8,
  },
  textComment: {
    fontSize: 14,
    fontFamily: FONTS.Regular,
    color: "#353B48",
    lineHeight: 24,
    marginTop: 8,
  },
  timeView: {
    flexDirection: "row",
    marginTop: 8,
  },
  textNumberLikes: {
    fontFamily: FONTS.Regular,
    fontSize: 12,
    textAlign: "right",
    color: "#353B48",
    lineHeight: 15,
  },
  optionView: {
    flexDirection: "row",
    width: 128,
    flex: 1,
    backgroundColor: "#ED3269",
    marginLeft: 24,
    marginBottom: 24,
  },
  buttonOption: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  flexRow: {
    flexDirection: "row",
  },
});
