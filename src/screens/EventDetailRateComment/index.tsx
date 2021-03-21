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
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  postEventReview,
  getEventAllReviews,
} from "redux/reviews/reviews.actions";
import ROUTES from "ultis/routes";
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

  const navigation = useNavigation();

  //@ts-ignore
  const {
    params: { eventId },
  } = useRoute();

  const getStars = (data) => {
    setstars(data);
  };

  const onClickListener = () => {
    const data = {
      event_id: eventId,
      stars: stars,
      comment: comment,
    };
    dispatch(
      postEventReview(data, () =>
        navigation.navigate(ROUTES.EventDetail, {
          data: {
            id: params?.eventId,
            save: true,
          },
        })
      )
    );
    setcomment("");
  };

  console.log({ all_reviews });
  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={80}
      style={styles.keyAvoid}
      behavior={Platform.OS == "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>
        <View style={styles.commentView}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {all_reviews?.map(
              ({ review, review_id, user_name, user_image }: reviewModel) => (
                <CommentItem
                  name={user_name}
                  key={review_id}
                  comment={review}
                  userImage={user_image}
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
