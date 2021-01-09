import React, {memo} from 'react';
import {ScrollView} from 'react-native';
import FollowingItem from 'screens/Following/components/FollowingItem';

const Following = memo(() => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <FollowingItem
        image={require('assets/Followers/img.jpg')}
        name={'Ethel Casey'}
        numberFollower={750}
        un_Follow={true}
      />
      <FollowingItem
        image={require('assets/Followers/img.jpg')}
        name={'Jessie Higgins'}
        numberFollower={260}
        un_Follow={true}
      />
      <FollowingItem
        image={require('assets/Followers/img.jpg')}
        name={'Verna Carpenter'}
        numberFollower={526}
        un_Follow={true}
      />
      <FollowingItem
        image={require('assets/Followers/img.jpg')}
        name={'Millie Fuller'}
        numberFollower={872}
        un_Follow={true}
      />
      <FollowingItem
        image={require('assets/Followers/img.jpg')}
        name={'Rosetta Hunter'}
        numberFollower={627}
        un_Follow={true}
      />
      <FollowingItem
        image={require('assets/Followers/img.jpg')}
        name={'John Guerrero'}
        numberFollower={154}
        un_Follow={true}
      />
      <FollowingItem
        image={require('assets/Followers/img.jpg')}
        name={'Sara Herrera'}
        numberFollower={593}
        un_Follow={true}
      />
    </ScrollView>
  );
});

export default Following;
