import React, { memo, useCallback, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { width_screen } from "ultis/dimensions";
import FONTS from "ultis/fonts";
import { getImage } from "ultis/functions";

interface CommentProps {
  name: string;
  comment: string;
  userImage: string;
}

const CommentItem = memo((props: CommentProps) => {

  return (
    <ScrollView
      horizontal={true}
      pagingEnabled={true}
      showsHorizontalScrollIndicator={false}
      //key={props.reviewId}
    >
      <View style={styles.container}>
      <Image
         source={{uri: getImage(props.userImage, "user")}}
          style={styles.bigAvatar}
        />
          <View style={styles.commentView}>
          <Text style={styles.textName}>{props.name}</Text>
          <Text style={styles.textComment}>{props.comment}</Text>
        </View>
      </View>
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
