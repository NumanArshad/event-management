import React, {memo, useCallback} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import IconAroundU from 'svgs/IconAroundU';
import FONTS from 'ultis/fonts';
import {useNavigation} from '@react-navigation/native';
import ROUTES from 'ultis/routes';
import EventItem from 'components/EventItem';
import ButtonFilter from 'components/buttons/ButtonFilter';

const EventAroundYou = memo(() => {
  const navigation = useNavigation();
  const onPressFilter = useCallback(() => {
    navigation.navigate(ROUTES.FilterEvez);
  }, [navigation]);

  const onPressAllEventAroundYou = useCallback(() => {
    navigation.navigate(ROUTES.AllEventAroundYou);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          style={styles.headerForU}
          onPress={onPressAllEventAroundYou}>
          <IconAroundU />
          <Text style={styles.textHeaderForU}>
            See All Event Around You - 10km
          </Text>
        </TouchableOpacity>
        <EventItem
          thumbnail={require('@assets/EventAroundU/around_u_1.png')}
          tag={['#nightlife', '#party']}
          reviewTimes={1.3}
          eventName={'Quiet Clubbing VIP Heated Rooftop Party'}
          location={'605 W 48th Street, Manhattan...'}
          distance={10}
          currentAttending={2500}
          maxAttending={10000}
          save={false}
          rate={4.5}
          price={20}
        />
        <EventItem
          thumbnail={require('@assets/EventAroundU/around_u_2.png')}
          tag={['#fashion', '#convention']}
          reviewTimes={2.4}
          eventName={'Bottled Art" Wine Painting Nigh'}
          location={'The Grand Connaught Rooms...'}
          distance={3.5}
          currentAttending={2568}
          maxAttending={10000}
          save={true}
          rate={4.5}
          timeCountDown={'7 Days 06 Hours 27 Mins 44 secs'}
          price={0}
        />
        <EventItem
          thumbnail={require('@assets/EventAroundU/around_u_3.png')}
          tag={['#Fashion', '#Convention']}
          reviewTimes={2.4}
          eventName={'Mahogany Bridal Fair 2016'}
          location={'The Grand Connaught Rooms...'}
          distance={3.5}
          currentAttending={10000}
          maxAttending={10000}
          save={false}
          rate={3.5}
          timeCountDown={'7 Days 06 Hours 27 Mins 44 secs'}
          price={120}
        />
      </ScrollView>
      <ButtonFilter onPress={onPressFilter} />
    </View>
  );
});

export default EventAroundYou;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 24,
    backgroundColor: '#fff',
  },
  scroll: {
    width: '100%',
  },
  headerForU: {
    flexDirection: 'row',
    height: 72,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textHeaderForU: {
    marginLeft: 16,
    color: '#ED3269',
    fontSize: 14,
    fontFamily: FONTS.Regular,
  },
});
