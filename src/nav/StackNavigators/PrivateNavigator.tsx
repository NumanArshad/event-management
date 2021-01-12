import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ROUTES from "ultis/routes";
import Walkthrough from "screens/Walkthrough";
import Settings from "screens/Settings";
import SelectCity from "screens/SelectCity";
import Rewards from "screens/Rewards";
import EvezForUTab from "nav/EvezForUTab";
import FilterEvez from "screens/FilterEvez";
import MainBottomTab from "nav/MainBottomTab";
import Notification from "screens/Notification";
import Inbox from "screens/Inbox";
import SelectHashtag from "screens/SelectHashtag";
import AllEventAroundYou from "screens/AllEventAroundYou";
import Attending from "screens/Attending";
import FollowTab from "nav/FollowTab";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar, TouchableOpacity } from "react-native";
import SearchPeople from "screens/SearchPeople";
import TabSearchEvents from "screens/TabSearchEvents";
import SearchNews from "screens/SearchNews";
import PurchaseDetail from "screens/PurchaseDetail";
import EventDetail from "screens/EventDetail";
import EvezNews from "screens/EvezNews";
import PeopleProfile from "screens/PeopleProfile";
import NewDetail from "screens/NewDetail";
import EventDetailMap from "screens/EventDetailMap";
import EventDetailRateComment from "screens/EventDetailRateComment";
import Chat from "screens/Chat";
import TicketDetail from "screens/TicketDetail";
import Routes from "screens/Routes";
import headerBackground from "components/header/headerbackground";
import headerRight from "components/header/headerRight";

const privateNavStack = createStackNavigator();

const PrivateNavigator = () => (
  
    <privateNavStack.Navigator
      initialRouteName={ROUTES.Walkthrough}
      screenOptions={{
        headerBackground: headerBackground,
        headerTintColor: "#FFF",
      }}
    >
      <privateNavStack.Screen
        name={ROUTES.Walkthrough}
        component={Walkthrough}
        options={{
          headerShown: false,
        }}
      />
      <privateNavStack.Screen
        name={ROUTES.Settings}
        component={Settings}
        options={{ headerBackTitleVisible: false, title: "Settings" }}
      />
      <privateNavStack.Screen
        name={ROUTES.SelectCity}
        component={SelectCity}
        options={{ headerBackTitleVisible: false, title: "Select City" }}
      />
      <privateNavStack.Screen
        name={ROUTES.SearchPeople}
        component={SearchPeople}
        options={{
          title: "Search People",
        }}
      />
      <privateNavStack.Screen
        options={{ headerBackTitleVisible: false, title: "Search News" }}
        name={ROUTES.SearchNews}
        component={SearchNews}
      />
      <privateNavStack.Screen
        name={ROUTES.TabSearchEvents}
        component={TabSearchEvents}
      />
      <privateNavStack.Screen
        name={ROUTES.Rewards}
        component={Rewards}
        options={{ headerShown: false }}
      />
      <privateNavStack.Screen
        name={ROUTES.TabFollowers}
        component={FollowTab}
        options={{ headerBackTitleVisible: false }}
      />
      <privateNavStack.Screen
        name={ROUTES.TicketDetail}
        component={TicketDetail}
        options={{ headerBackTitleVisible: false }}
      />
      <privateNavStack.Screen
        name={ROUTES.Chat}
        component={Chat}
        options={{
          headerBackTitleVisible: false,
          title: "Chat",
          headerRight: headerRight,
        }}
      />
      <privateNavStack.Screen
        name={ROUTES.Inbox}
        component={Inbox}
        options={{ headerBackTitleVisible: false, title: "Inbox" }}
      />
      <privateNavStack.Screen
        name={ROUTES.EvezForYou}
        component={EvezForUTab}
      />
      <privateNavStack.Screen
        name={ROUTES.FilterEvez}
        component={FilterEvez}
        options={{ headerBackTitleVisible: false, title: "Filter" }}
      />
      <privateNavStack.Screen
        name={ROUTES.EventDetailRateComment}
        component={EventDetailRateComment}
        options={{ title: "Reviews", headerBackTitleVisible: false }}
      />
      <privateNavStack.Screen
        name={ROUTES.NewDetail}
        component={NewDetail}
        options={{ headerShown: false }}
      />
      <privateNavStack.Screen
        name={ROUTES.Notification}
        component={Notification}
        options={{ headerBackTitleVisible: false, title: "Notifications" }}
      />
      <privateNavStack.Screen
        name={ROUTES.SelectHashtag}
        component={SelectHashtag}
        options={{ headerBackTitleVisible: false, title: "Select #Hashtag" }}
      />
      <privateNavStack.Screen
        name={ROUTES.EvezNews}
        component={EvezNews}
        options={{ headerShown: false }}
      />
      <privateNavStack.Screen
        name={ROUTES.PeopleProfile}
        component={PeopleProfile}
        options={{
          headerShown: false,
        }}
      />
      <privateNavStack.Screen
        name={ROUTES.MainBottomTab}
        component={MainBottomTab}
        options={{
          title: "Plan in New York",
          headerShown: false,
        }}
      />
      <privateNavStack.Screen
        name={ROUTES.AllEventAroundYou}
        component={AllEventAroundYou}
        options={{ headerShown: false }}
      />
      <privateNavStack.Screen
        name={ROUTES.EventDetail}
        component={EventDetail}
        options={{ headerShown: false }}
      />
      <privateNavStack.Screen
        name={ROUTES.ListAttending}
        component={Attending}
        options={{ headerBackTitleVisible: false, title: "Attending" }}
      />
      <privateNavStack.Screen
        name={ROUTES.PurchaseDetail}
        component={PurchaseDetail}
        options={{ headerShown: false }}
      />
      <privateNavStack.Screen
        name={ROUTES.EventDetailMap}
        component={EventDetailMap}
        options={{ headerShown: false }}
      />
      <privateNavStack.Screen
        name={ROUTES.Routes}
        component={Routes}
        options={{ headerBackTitleVisible: false }}
      />
    </privateNavStack.Navigator>

);

export default PrivateNavigator;
