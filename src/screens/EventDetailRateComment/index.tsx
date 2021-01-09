import React, {memo} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import CommentItem from 'screens/EventDetailRateComment/components/CommentItem';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import SvgSend from 'svgs/EventDetailRateComment/SvgSend';
import FONTS from 'ultis/fonts';
import Rating from "components/Rating";

const EventDetailRateComment = memo(() => {
  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={52}
      style={styles.keyAvoid}
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
      <View style={styles.container}>
        <View style={styles.commentView}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <CommentItem
              name={'Claudia Blake'}
              rate={4.5}
              comment={'Omg those lights!'}
              isLike={false}
              numberLike={2}
              numberReply={1}
              time={'2 HOURS AGO'}
            />
            <CommentItem
              name={'Cynthia Lamb'}
              rate={5}
              comment={
                'Absolutely love the pic!! Would mean the world to me if you went on my account and followed me.'
              }
              isLike={true}
              numberLike={10}
              numberReply={0}
              time={'5 HOURS AGO'}
            />
            <CommentItem
              name={'Rosa Richards'}
              rate={5}
              comment={'Love it! I want to join now!'}
              isLike={false}
              numberLike={2}
              numberReply={1}
              time={'2 HOURS AGO'}
            />
            <CommentItem
              name={'Callie Alvarez'}
              rate={4.5}
              comment={'Awesome!!!'}
              isLike={false}
              numberLike={1}
              numberReply={1}
              time={'2 HOURS AGO'}
            />
            <CommentItem
              name={'Claudia Blake'}
              rate={4.5}
              comment={'Omg those lights!'}
              isLike={false}
              numberLike={2}
              numberReply={1}
              time={'2 HOURS AGO'}
            />
            <CommentItem
              name={'Claudia Blake'}
              rate={4.5}
              comment={'Omg those lights!'}
              isLike={false}
              numberLike={2}
              numberReply={1}
              time={'2 HOURS AGO'}
            />
            <CommentItem
              name={'Claudia Blake'}
              rate={4.5}
              comment={'Omg those lights!'}
              isLike={false}
              numberLike={2}
              numberReply={1}
              time={'2 HOURS AGO'}
            />
          </ScrollView>
        </View>
        <View style={styles.writeComment}>
          <Rating rate={4} />
          <View style={styles.line} />
          <View style={styles.writeAndSend}>
            <TextInput
              style={styles.textInput}
              placeholder={'Write a review'}
            />
            <SvgSend />
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
    backgroundColor: '#fff',
    paddingBottom: getBottomSpace(),
  },
  commentView: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 24,
  },
  writeComment: {
    width: '100%',
    alignItems: 'center',
    paddingTop: 13,
  },
  line: {
    width: '100%',
    backgroundColor: '#F2F2F2',
    height: 1,
    marginTop: 16,
  },
  writeAndSend: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 20,

  },
  textInput: {
    flex: 1,
    fontSize: 14,
    fontFamily: FONTS.Regular,
    color: '#7F8FA6',
  },
});
