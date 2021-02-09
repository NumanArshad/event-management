import React, { memo, useCallback, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import FONTS from "ultis/fonts";
import IconArrowDown from "svgs/IconArrowDown";
import ItemTag from "screens/FilterEvez/components/ItemTag";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { height_screen, width_screen } from "ultis/dimensions";
import { getBottomSpace } from "react-native-iphone-x-helper";
import ButtonLinear from "components/buttons/ButtonLinear";
import CheckBox from "components/CheckBox";
import { useNavigation, useRoute } from "@react-navigation/native";
import ROUTES from "ultis/routes";
import Rating from "components/Rating";
import { adsVideoId } from "data/ads";
import { AdMobInterstitial } from "expo-ads-admob";
import { useDispatch } from "react-redux";
import { clearAllEvents, getFilteredEvents } from "redux/events/events.actions";

const FilterEvez = memo(() => {
  const navigation = useNavigation();

  //@ts-ignore
  const {params:{activeFilter}} = useRoute();

  const [activeTag, setactiveTag] = useState(activeFilter?.eventType || "");
  const [eventLocation, setEventLocation] = useState(activeFilter?.eventLocation || "");

  const dispatch = useDispatch();

  const eventTags = [
    "Participation",
    "Entertainment",
    "Consultation",
    "Leads",
    "Cash-Back",
  ];

  const handleActiveTag = (data: string) => {
    setactiveTag(activeTag === data ? "" : data);
  };

  const onPressShowAllEvent = () => {
    (eventLocation || activeTag || activeFilter?.eventType || activeFilter?.eventLocation) && 
    (eventLocation!==activeFilter?.eventLocation || activeTag!==activeFilter?.eventType)  
    &&  dispatch(clearAllEvents());
   navigation.navigate(ROUTES.EvezTrending,{
       eventLocation,
       eventType: activeTag
   })
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
        <View style={styles.optionHeader}>
          <Text style={styles.textOptionHeader}>Event Type</Text>
          <TouchableOpacity>
            <IconArrowDown />
          </TouchableOpacity>
        </View>
        <View style={styles.hashTagView}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {eventTags
              ? eventTags.map((tag, id) => (
                  <ItemTag
                    active={tag === activeTag}
                    onPress={() => handleActiveTag(tag)}
                    tagName={tag}
                    key={id}
                  />
                ))
              : null}
          </ScrollView>
         </View>

         <Text style={styles.textOptionHeader}>Event Location {eventLocation}</Text>
          <TextInput
         style={styles.textInput}
          placeholder="Event Location"
          value={eventLocation}
          onChangeText={setEventLocation}
        />
      </ScrollView> 
      <View style={styles.buttonView}>
        <ButtonLinear
          title={"Show Filtered Events"}
          style={styles.bottomButton}
          onPress={onPressShowAllEvent}
        />
      </View>
    </View>
  );
});

export default FilterEvez;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  textInput: {
    height: height_screen * 0.07,
    width: width_screen * 0.9,
    borderWidth: 0.8,
    borderColor: "#F05F3E",
    borderRadius: 10,
    marginTop: height_screen * 0.03,
    paddingLeft: height_screen * 0.02,
  },
  scroll: {
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  optionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textOptionHeader: {
    fontSize: 16,
    fontFamily: FONTS.Medium,
    lineHeight: 25,
  },
  hashTagView: {
    flexDirection: "row",
    marginTop: 24,
    marginBottom: 20,
  },
  star: {
    marginRight: 16,
  },
  rateStar: {
    marginTop: 15,
    alignItems: "center",
    marginBottom: 40,
  },
  textDistance: {
    fontSize: 16,
    fontFamily: FONTS.Medium,
    color: "#ED3269",
    marginLeft: 8,
  },
  distanceHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  trackStyle: {
    height: 4,
    backgroundColor: "#F1F1F1",
  },
  selectedStyle: {
    backgroundColor: "#ED3269",
  },
  slider: {
    marginTop: 12,
    marginBottom: 35,
    paddingHorizontal: 8,
  },
  checkStyle: {
    padding: 0,
    backgroundColor: "#fff",
    borderColor: "#fff",
    width: 26,
    marginLeft: 0,
  },
  textChecker: {
    fontFamily: FONTS.Regular,
    fontSize: 14,
    color: "#353B48",
    marginLeft: 8,
  },
  bottomButton: {
    height: 50,
    borderRadius: 100,
  },
  buttonView: {
    paddingBottom: getBottomSpace() + 16,
    width: "100%",
    paddingHorizontal: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#F1F1F1",
  },
  checkerView: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkFree: {
    flexDirection: "row",
    alignItems: "center",
  },
});
