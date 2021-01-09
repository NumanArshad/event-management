import React, {memo} from 'react';
import {ScrollView} from 'react-native';
import UserItem from 'components/UserItem';

const MayBeYouKnow = memo(() => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <UserItem
        image={require('assets/Followers/img.jpg')}
        name={'Jose Lowe'}
        numberFollower={'179'}
      />
      <UserItem
        image={require('assets/Followers/img.jpg')}
        name={'Hulda James'}
        numberFollower={'944'}
      />
      <UserItem
        image={require('assets/Followers/img.jpg')}
        name={'Louisa Lyons'}
        numberFollower={'641'}
      />
      <UserItem
        image={require('assets/Followers/img.jpg')}
        name={'Bessie Mendoza'}
        numberFollower={'998'}
      />
      <UserItem
        image={require('assets/Followers/img.jpg')}
        name={'Matilda McGuire'}
        numberFollower={'748'}
      />
      <UserItem
        image={require('assets/Followers/img.jpg')}
        name={'Harriett Coleman'}
        numberFollower={'245'}
      />
      <UserItem
        image={require('assets/Followers/img.jpg')}
        name={'Matilda McGuire'}
        numberFollower={'748'}
      />
      <UserItem
        image={require('assets/Followers/img.jpg')}
        name={'Harriett Coleman'}
        numberFollower={'245'}
      />
    </ScrollView>
  );
});

export default MayBeYouKnow;
