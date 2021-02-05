import React, { memo, useCallback, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import FONTS from "ultis/fonts";
import IconArrowDown from "svgs/IconArrowDown";
import ItemTag from "screens/FilterEvez/components/ItemTag";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { width_screen } from "ultis/dimensions";
import { getBottomSpace } from "react-native-iphone-x-helper";
import ButtonLinear from "components/buttons/ButtonLinear";
import CheckBox from "components/CheckBox";
import { useNavigation } from "@react-navigation/native";
import ROUTES from "ultis/routes";
import Rating from "components/Rating";
import { adsVideoId } from "data/ads";
import { AdMobInterstitial } from "expo-ads-admob";
import { useDispatch } from "react-redux";
import { getFilteredEvents } from "redux/events/events.actions";

const FilterEvez = memo(() => {
  const [valuesDistance, setValuesDistance] = useState([1]);
  const [valuesPriceDistance, setValuesPriceDistance] = useState([10, 250]);
  const [isFree, setFree] = useState(false);
  const navigation = useNavigation();
  const [typeEvents, settypeEvents] = useState("No");
  const [location, setLocation] = useState("");
  const dispatch = useDispatch();

  const onValuesDistanceChange = useCallback((values) => {
    setValuesDistance(values);
  }, []);
  const onValuesPriceChange = useCallback((values) => {
    setValuesPriceDistance(values);
  }, []);
  const onPressCheck = useCallback(() => {
    setFree(!isFree);
  }, [isFree]);

  const setEventsType = (data) => {
    console.log("Data Type", data);

    setEventsType(data);
  };
  const onPressShowAllEvent = useCallback(() => {
    // AdMobInterstitial.setAdUnitID(adsVideoId);
    // AdMobInterstitial.requestAdAsync()
    //   .then(() => AdMobInterstitial.showAdAsync())
    //   .finally(() => {
    //     const radius = valuesDistance[0];
    //     navigation.navigate(ROUTES.AllEventAroundYou, {
    //       radius: radius,
    //       price: valuesPriceDistance,
    //     });
    //   });
    // dispatch(getFilteredEvents(typeEvents));
    console.log("Data Type", typeEvents);
  }, []);

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
            <ItemTag
              active={false}
              // onPress={setEventsType}
              tagName={"Consultation"}
            />
            <ItemTag
              active={true}
              // onPress={setEventsType}
              tagName={"Lead"}
            />
            <ItemTag
              active={false}
              // onPress={setEventsType}
              tagName={"Participation"}
            />
            <ItemTag
              active={false}
              // onPress={setEventsType}
              tagName={"Entertainment"}
            />
          </ScrollView>
        </View>

        {/* <View style={styles.optionHeader}>
          <Text style={styles.textOptionHeader}>HashTag</Text>
          <TouchableOpacity>
            <IconArrowDown />
          </TouchableOpacity>
        </View>
        <View style={styles.hashTagView}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <ItemTag active={false} tagName={"All hashtag"} />
            <ItemTag active={true} tagName={"#music"} />
            <ItemTag active={true} tagName={"#festival"} />
            <ItemTag active={false} tagName={"#food"} />
          </ScrollView>
        </View> */}

        {/* <Text style={styles.textOptionHeader}>Rating</Text>
        <View style={styles.rateStar}>
          <Rating rate={3} />
        </View> */}

        {/* <View style={styles.distanceHeader}>
          <Text style={styles.textOptionHeader}>Distance</Text>
          <Text style={styles.textDistance}>{valuesDistance[0]}mil</Text>
        </View> */}
        {/* <MultiSlider
          min={1}
          max={50}
          containerStyle={styles.slider}
          trackStyle={styles.trackStyle}
          selectedStyle={styles.selectedStyle}
          sliderLength={(327 / 375) * width_screen}
          values={valuesDistance}
          onValuesChange={onValuesDistanceChange}
        />

        <View style={styles.distanceHeader}>
          <Text style={styles.textOptionHeader}>Price</Text>
          <Text style={styles.textDistance}>
            ${valuesPriceDistance[0]} - ${valuesPriceDistance[1]}
          </Text>
        </View>
        <MultiSlider
          min={0}
          max={1000}
          containerStyle={styles.slider}
          trackStyle={styles.trackStyle}
          selectedStyle={styles.selectedStyle}
          sliderLength={(327 / 375) * width_screen}
          values={valuesPriceDistance}
          onValuesChange={onValuesPriceChange}
        /> */}
        {/* <View style={styles.checkFree}>
          <CheckBox
            onPress={onPressCheck}
            isCheck={isFree}
            borderColor={"#7F8FA6"}
            checkedColor={"#ED3269"}
          />
          <Text style={styles.textChecker}>Only free events</Text>
        </View> */}
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
    marginBottom: 40,
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
