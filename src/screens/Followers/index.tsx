import React, {memo} from 'react';
import {ScrollView} from 'react-native';
import UserItem from 'components/UserItem';

const Followers = memo(() => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {/* <UserItem
        image={require('assets/Followers/img.jpg')}
        name={'Ethel Casey'}
        numberFollower={'750'}
      />
      <UserItem
        image={require('assets/Followers/img.jpg')}
        name={'Jessie Higgins'}
        numberFollower={'260'}
      />
      <UserItem
        image={require('assets/Followers/img.jpg')}
        name={'Verna Carpenter'}
        numberFollower={'526'}
      />
      <UserItem
        image={require('assets/Followers/img.jpg')}
        name={'Millie Fuller'}
        numberFollower={'872'}
      />
      <UserItem
        image={require('assets/Followers/img.jpg')}
        name={'Rosetta Hunter'}
        numberFollower={'627'}
      />
      <UserItem
        image={require('assets/Followers/img.jpg')}
        name={'John Guerrero'}
        numberFollower={'154'}
      />
      <UserItem
        image={require('assets/Followers/img.jpg')}
        name={'Sara Herrera'}
        numberFollower={'593'}
      /> */}
    </ScrollView>
  );
});

export default Followers;
