import React, {memo, useCallback} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import InboxItem from 'screens/Inbox/components/InboxItem';
import keyExtractor from 'ultis/keyExtractor';

const data = [
  {
    image: require('assets/Inbox/Raymond.png'),
    nameUser: 'Raymond Tyler',
    numberMessage: 4,
    message: "It's going well! How about you?",
    time: '2 HOURS AGO',
  },
  {
    image: require('assets/Inbox/Kyle.png'),
    nameUser: 'Kyle McKenzie',
    numberMessage: 0,
    message: "I'm a dentist.",
    time: '5 HOURS AGO',
  },
  {
    image: require('assets/Inbox/Linnie.png'),
    nameUser: 'Linnie Lyons',
    numberMessage: 0,
    message: 'What do you do for a living?',
    time: 'MAR. 1,2018',
  },
  {
    image: require('assets/Inbox/Callie.png'),
    nameUser: 'Callie Holland',
    numberMessage: 0,
    message: "It's going well! How about you?",
    time: 'FEB. 18,2018',
  },
  {
    image: require('assets/Inbox/Chris.png'),
    nameUser: 'Chris Austin',
    numberMessage: 2,
    message: 'Pardon me?',
    time: 'FEB. 19,2018',
  },
  {
    image: require('assets/Inbox/Mildred.png'),
    nameUser: 'Mildred Nelson',
    numberMessage: 0,
    message: 'Hi! Nice to meet you.',
    time: 'MAR. 1,2018',
  },
  {
    image: require('assets/Inbox/Chester.png'),
    nameUser: 'Chester Wheeler',
    numberMessage: 0,
    message: "It's going well! How about you?",
    time: 'FEB. 18,2018',
  },
  {
    image: require('assets/Inbox/Callie.png'),
    nameUser: 'Lelia Sparks',
    numberMessage: 0,
    message: "It's going well!",
    time: 'FEB. 19,2018',
  },
  {
    image: require('assets/Inbox/Millie.png'),
    nameUser: 'Millie May',
    numberMessage: 0,
    message: ' How about you?',
    time: 'FEB. 26,2018',
  },
];

const Inbox = memo(() => {
  const renderItem = useCallback(({item}) => {
    const {image, nameUser, numberMessage, massage, time} = item;
    return (
      <InboxItem
        image={image}
        nameUser={nameUser}
        numberMessage={numberMessage}
        message={massage}
        time={time}
      />
    );
  }, []);

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      style={styles.container}
      data={data}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
    />
  );
});

export default Inbox;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
