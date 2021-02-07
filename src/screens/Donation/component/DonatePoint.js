import React, { memo, useCallback, useEffect, useState } from "react";
import { StyleSheet, View, FlatList, Text, Modal, Alert } from "react-native";
import keyExtractor from "ultis/keyExtractor";
import TicketItem from "screens/ProfileTickets/components/TicketItem";
import {
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { height_screen, width_screen } from "ultis/dimensions";
import { LinearGradient } from "expo-linear-gradient";
import FONTS from "ultis/fonts";
import { useSelector, useDispatch } from "react-redux";
import { getCompanies, sendDonation } from "redux/donate/donate.actions";
import store from "../../../redux/store";

const DonatePoint = () => {
  const dispatch = useDispatch();
  const [companiesList, setcompaniesList] = useState([]);
  const [organizationID, setorganizationID] = useState("");
  const { companies } = useSelector((state) => state.donate);
  const [modalVisible, setModalVisible] = useState(false);
  const [credits, setcredits] = useState("");

  useEffect(() => {
    if (Array.isArray(companies) && companies.length > 0) {
      // makeRow();
    } else {
      dispatch(getCompanies());
      //console.log("Run", companies);
    }
  }, [dispatch, companies]);

  const onClickListener = () => {
    const data = {
      organization_id: organizationID,
      credits: credits,
    };
    //console.log("Send Donation", data);
    setModalVisible(false);
    setcredits("");
    dispatch(sendDonation(data, Alert));
  };
  return (
    <View style={styles.container}>
      {Array.isArray(companies) && companies.length > 0
        ? companies.map((data, id) => (
            <View style={styles.CompanyView} key={id}>
              <Text style={styles.companyText}>{data?.name}</Text>
              <TouchableOpacity
                onPress={() => {
                  setorganizationID(data.id);
                  setModalVisible(true);
                }}
              >
                <LinearGradient
                  colors={["#ED3269", "#F05F3E"]}
                  start={{ x: 0, y: 1 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.btnStyle2}
                >
                  <Text style={styles.companyBtn}>Donate</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          ))
        : null}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <LinearGradient
          colors={["#ED3269", "#F05F3E"]}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 1 }}
          style={styles.modalView}
        >
          <View>
            <Text style={styles.creditAsk}>
              How many Credits You want to Donate ?
            </Text>
            <TextInput
              style={styles.textInput}
              placeholder={"Enter No of Credits"}
              placeholderTextColor="#fff"
              onChangeText={(data) => setcredits(data)}
              value={credits}
              keyboardType="number-pad"
            />

            <View style={styles.btnView}>
              <Text
                onPress={() => {
                  setModalVisible(false);
                }}
                style={styles.BtnModal}
              >
                Cancel
              </Text>
              <Text onPress={onClickListener} style={styles.BtnModal}>
                Send
              </Text>
            </View>
          </View>
        </LinearGradient>
        {/* <View style={styles.modalView}>
        </View> */}
      </Modal>
    </View>
  );
};
export default DonatePoint;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingTop: height_screen * 0.01,
  },
  contentContainerStyle: {
    paddingBottom: 20,
  },
  select: {
    width: width_screen * 0.95,
    backgroundColor: "red",
    alignSelf: "center",
    height: height_screen * 0.08,
    justifyContent: "center",
    alignItems: "center",
  },
  loginBtn: {
    backgroundColor: "transparent",
    borderRadius: 10,
    textAlign: "center",
    color: "#fff",
    fontSize: height_screen * 0.02,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  btnStyle: {
    borderRadius: 10,
    height: height_screen * 0.08,
    width: width_screen * 0.95,
    alignSelf: "center",
    marginTop: height_screen * 0.01,
    justifyContent: "center",
    alignItems: "center",
  },
  CompanyView: {
    flexDirection: "row",
    borderColor: "#ED3269",
    borderWidth: 0.5,
    width: width_screen * 0.95,
    height: height_screen * 0.08,
    alignSelf: "center",
    borderRadius: 10,
    marginTop: "5%",
    padding: "1%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  btnStyle2: {
    borderRadius: 10,
    alignSelf: "center",
    // marginTop: height_screen * 0.01,
    justifyContent: "center",
    alignItems: "center",
    height: height_screen * 0.07,
    width: width_screen * 0.3,
  },
  companyBtn: {
    color: "#fff",
    fontSize: height_screen * 0.025,
  },
  companyText: {
    fontFamily: FONTS.Medium,
    color: "#000",
    fontSize: height_screen * 0.02,
    paddingLeft: width_screen * 0.05,
  },
  modalView: {
    flexDirection: "row",
    height: height_screen * 0.25,
    width: "85%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F05F3E",
    alignSelf: "center",
    top: height_screen * 0.4,
    borderRadius: 10,
    padding: 5,
  },
  textInput: {
    fontSize: 14,
    fontFamily: FONTS.Regular,
    color: "#fff",
    alignSelf: "center",
    height: 60,
    marginVertical: height_screen * 0.015,
    borderBottomWidth: 0.5,
    borderBottomColor: "#fff",
    width: "80%",
  },
  BtnModal: {
    color: "#fff",
    fontSize: 16,
    borderWidth: 0.5,
    paddingVertical: height_screen * 0.01,
    paddingHorizontal: width_screen * 0.05,
    borderColor: "#fff",
    borderRadius: 10,
  },
  btnView: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
    alignSelf: "center",
    marginBottom: height_screen * 0.02,
  },
  creditAsk: {
    color: "#fff",
    fontSize: 15,
    textAlign: "center",
  },
});
