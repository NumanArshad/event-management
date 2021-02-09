import React, { memo, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import CommentItem from "screens/EventDetailRateComment/components/CommentItem";
import { getBottomSpace } from "react-native-iphone-x-helper";
import SvgSend from "svgs/EventDetailRateComment/SvgSend";
import FONTS from "ultis/fonts";
import Rating from "components/Rating";
import { useRoute } from "@react-navigation/native";
import { postEventReview } from "redux/reviews/reviews.actions";
import {alertMessage} from "ultis/alertToastMessages";

interface reviewModel {
  review: string;
  review_id: number;
  user_name: string;
  user_image: string;

}


const EventDetailRateComment = memo(() => {
  const { all_reviews } = useSelector<any, any>((state) => state.reviews);
  const [comment, setcomment] = useState("");
  const [stars, setstars] = useState("");
  const dispatch = useDispatch();

  //@ts-ignore
  const {
    params: { eventId },
  } = useRoute();

  const getStars = (data) => {
  //  alertMessage("njfbj")
   // //console.log("stars are", data)
    setstars(data);
    // //console.log("Data", data);
  };

  const onClickListener = () => {
    const data = {
      event_id: eventId,
      stars: stars,
      comment: comment,
    };
    //console.log("Post Review", data);
    dispatch(postEventReview(data));
    setcomment("");
  };
  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={80}
      style={styles.keyAvoid}
      behavior={Platform.OS == "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>
        <View style={styles.commentView}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* {//console.log("Reviews", all_reviews)} */}
            {all_reviews?.map(
              ({ review, review_id, user_name, user_image }: reviewModel) => (
                <CommentItem
                  name={user_name}  
                  //    rate={4.5}
                  key={review_id}
                  comment={review}
                  userImage={user_image}
                  //  isLike={false}
                  // numberLike={2}
                  //  numberReply={review_id}
                  //  time={"2 HOURS AGO"}
                />
              )
            )}
          </ScrollView>
        </View>
        <View style={styles.writeComment}>
          <Rating rate={0} onPress={getStars} />
          <View style={styles.line} />
          <View style={styles.writeAndSend}>
            <TextInput
              style={styles.textInput}
              placeholder={"Write a review ..."}
              onChangeText={(data) => setcomment(data)}
              value={comment}
            />
            <SvgSend onPress={onClickListener} />
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
});

export default EventDetailRateComment;

const styles = StyleSheet.create({
  keyAvoid: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingBottom: getBottomSpace(),
  },
  commentView: {
    flex: 1,
    alignItems: "center",
    paddingTop: 24,
  },
  writeComment: {
    width: "100%",
    alignItems: "center",
    paddingTop: 13,
  },
  line: {
    width: "100%",
    backgroundColor: "#F2F2F2",
    height: 1,
    marginTop: 16,
  },
  writeAndSend: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    fontFamily: FONTS.Regular,
    color: "#7F8FA6",
  },
});
