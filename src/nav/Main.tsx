import React, {memo} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import ROUTES from 'ultis/routes';
import Walkthrough from 'screens/Walkthrough';
import Settings from 'screens/Settings';
import SelectCity from 'screens/SelectCity';
import Rewards from 'screens/Rewards';
import EvezForUTab from 'nav/EvezForUTab';
import FilterEvez from 'screens/FilterEvez';
import MainBottomTab from 'nav/MainBottomTab';
import Notification from 'screens/Notification';
import Inbox from 'screens/Inbox';
import SelectHashtag from 'screens/SelectHashtag';
import AllEventAroundYou from 'screens/AllEventAroundYou';
import Attending from 'screens/Attending';
import FollowTab from 'nav/FollowTab';
import {LinearGradient} from 'expo-linear-gradient';
import {StatusBar, TouchableOpacity} from 'react-native';
import SearchPeople from 'screens/SearchPeople';
import TabSearchEvents from 'screens/TabSearchEvents';
import SearchNews from 'screens/SearchNews';
import PurchaseDetail from 'screens/PurchaseDetail';
import EventDetail from 'screens/EventDetail';
import EvezNews from 'screens/EvezNews';
import PeopleProfile from 'screens/PeopleProfile';
import NewDetail from 'screens/NewDetail';
import EventDetailMap from 'screens/EventDetailMap';
import EventDetailRateComment from 'screens/EventDetailRateComment';
import Chat from 'screens/Chat';
import SvgChatOption from 'svgs/PeopleProfile/SvgChatOption';
import TicketDetail from 'screens/TicketDetail';
import Routes from 'screens/Routes';

const Stack = createStackNavigator();
export const headerBackground = () => (
    <LinearGradient
        colors={['#ED3269', '#F05F3E']}
        start={{x: 0, y: 1}}
        end={{x: 1, y: 1}}
        style={{flex: 1}}
    />
);
export const headerRight = () => (
    <TouchableOpacity>
        <SvgChatOption style={{right: 24}}/>
    </TouchableOpacity>
);
const Main = memo(() => {
    return (
        <NavigationContainer>
            <StatusBar
                barStyle={'light-content'}
                translucent={true}
                backgroundColor={'transparent'}
            />
            <Stack.Navigator
                initialRouteName={ROUTES.Walkthrough}
                screenOptions={{
                    headerBackground: headerBackground,
                    headerTintColor: '#FFF',
                }}>
                <Stack.Screen
                    name={ROUTES.Walkthrough}
                    component={Walkthrough}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name={ROUTES.Settings}
                    component={Settings}
                    options={{headerBackTitleVisible: false, title: 'Settings'}}
                />
                <Stack.Screen
                    name={ROUTES.SelectCity}
                    component={SelectCity}
                    options={{headerBackTitleVisible: false, title: 'Select City'}}
                />
                <Stack.Screen
                    name={ROUTES.SearchPeople}
                    component={SearchPeople}
                    options={{
                        title: 'Search People',
                    }}
                />
                <Stack.Screen
                    options={{headerBackTitleVisible: false, title: 'Search News'}}
                    name={ROUTES.SearchNews}
                    component={SearchNews}
                />
                <Stack.Screen
                    name={ROUTES.TabSearchEvents}
                    component={TabSearchEvents}
                />
                <Stack.Screen
                    name={ROUTES.Rewards}
                    component={Rewards}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name={ROUTES.TabFollowers}
                    component={FollowTab}
                    options={{headerBackTitleVisible: false}}
                />
                <Stack.Screen
                    name={ROUTES.TicketDetail}
                    component={TicketDetail}
                    options={{headerBackTitleVisible: false}}
                />
                <Stack.Screen
                    name={ROUTES.Chat}
                    component={Chat}
                    options={{
                        headerBackTitleVisible: false,
                        title: 'Chat',
                        headerRight: headerRight,
                    }}
                />
                <Stack.Screen
                    name={ROUTES.Inbox}
                    component={Inbox}
                    options={{headerBackTitleVisible: false, title: 'Inbox'}}
                />
                <Stack.Screen name={ROUTES.EvezForYou} component={EvezForUTab}/>
                <Stack.Screen
                    name={ROUTES.FilterEvez}
                    component={FilterEvez}
                    options={{headerBackTitleVisible: false, title: 'Filter'}}
                />
                <Stack.Screen
                    name={ROUTES.EventDetailRateComment}
                    component={EventDetailRateComment}
                    options={{title: 'Reviews', headerBackTitleVisible: false}}
                />
                <Stack.Screen
                    name={ROUTES.NewDetail}
                    component={NewDetail}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name={ROUTES.Notification}
                    component={Notification}
                    options={{headerBackTitleVisible: false, title: 'Notifications'}}
                />
                <Stack.Screen
                    name={ROUTES.SelectHashtag}
                    component={SelectHashtag}
                    options={{headerBackTitleVisible: false, title: 'Select #Hashtag'}}
                />
                <Stack.Screen
                    name={ROUTES.EvezNews}
                    component={EvezNews}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name={ROUTES.PeopleProfile}
                    component={PeopleProfile}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name={ROUTES.MainBottomTab}
                    component={MainBottomTab}
                    options={{
                        title: 'Plan in New York',
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name={ROUTES.AllEventAroundYou}
                    component={AllEventAroundYou}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name={ROUTES.EventDetail}
                    component={EventDetail}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name={ROUTES.ListAttending}
                    component={Attending}
                    options={{headerBackTitleVisible: false, title: 'Attending'}}
                />
                <Stack.Screen
                    name={ROUTES.PurchaseDetail}
                    component={PurchaseDetail}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name={ROUTES.EventDetailMap}
                    component={EventDetailMap}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name={ROUTES.Routes}
                    component={Routes}
                    options={{headerBackTitleVisible: false}}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
});

export default Main;
