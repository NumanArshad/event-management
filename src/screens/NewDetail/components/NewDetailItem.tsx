import React from 'react';
import {Image, ScrollView, StyleSheet, Text} from 'react-native';

interface Props {
  imgEvent: any;
  tag: string[];
  event: string;
  time: string;
  description: string;
}

const NewDetailItem = (props: Props) => {
  return (
    <ScrollView style={styles.container}>
      <Image source={props.imgEvent} />
      <Text>{props.tag}</Text>
      <Text>{props.event}</Text>
      <Text>{props.time}</Text>
    </ScrollView>
  );
};

export default NewDetailItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
