import React, {memo} from 'react';
import {Image, StyleSheet, View} from 'react-native';

interface EventAttendingProps {
  location?: string;
  eventDateTime?: string;
}

const EventAttending = memo((props: EventAttendingProps) => {
  return (
    <View>
      {props.location ? (
        <View style={styles.flexRow}>
          <Image
            source={require('@assets/EventAroundU/avatar_1.png')}
            style={styles.avatar}
          />
          <Image
            source={require('@assets/EventAroundU/avatar_1.png')}
            style={styles.avatar}
          />
          <Image
            source={require('@assets/EventAroundU/avatar_1.png')}
            style={styles.avatar}
          />
          <Image
            source={require('@assets/EventAroundU/avatar_1.png')}
            style={styles.avatar}
          />
          <Image
            source={require('@assets/EventAroundU/avatar_1.png')}
            style={styles.avatar}
          />
        </View>
      ) : null}
      {props.eventDateTime ? (
        <View style={[styles.location, {marginLeft: 24}]}>
          <View style={styles.flexRow}>
            <Image
              source={require('@assets/big_avatar_1.png')}
              style={styles.bigAvatar}
            />
            <Image
              source={require('@assets/big_avatar_1.png')}
              style={styles.bigAvatar}
            />
            <Image
              source={require('@assets/big_avatar_1.png')}
              style={styles.bigAvatar}
            />
            <Image
              source={require('@assets/big_avatar_1.png')}
              style={styles.bigAvatar}
            />
            <Image
              source={require('@assets/big_avatar_1.png')}
              style={styles.bigAvatar}
            />
          </View>
        </View>
      ) : null}
    </View>
  );
});

export default EventAttending;

const styles = StyleSheet.create({
  avatar: {
    width: 18,
    height: 18,
    marginLeft: -8,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: '#F2F2F2',
  },
  bigAvatar: {
    width: 32,
    height: 32,
    marginRight: 8,
    borderRadius: 32 / 2,
  },
  location: {
    flexDirection: 'row',
    marginTop: 8,
    justifyContent: 'space-between',
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
