import React, { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import {noFoundImg} from "ultis/constants"
import firebase from "ultis/services/FirebaseConfig";
import { alertMessage } from "ultis/alertToastMessages";
import { storage } from "firebase";

const useImagePicker = () => {
    
    const [image, setImage] = useState(noFoundImg);

    const storageRef = firebase.storage().ref();

    useEffect(() => {
        (async () => {
          if (Platform.OS !== "web") {
            const {
              status,
            } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== "granted") {
              Alert.alert(
                "",
                "Sorry, we need camera roll permissions to make this work!"
              );
            }
          }
        })();
      }, []);
    
      const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });

        if (!result.cancelled) {
          setImage(result.uri);
        }
      };

      const uploadImage = async() => {
          const imgExtension = image?.split('.').slice(-1)
          const timeStamp = new Date()?.getTime();
          const fileName = `${timeStamp}.${imgExtension}`;
          try{
          const blobInput = await fetch(image);
          const blob = await blobInput.blob();
          const imageStoreRef = storageRef.child(`/${fileName}`);

          await imageStoreRef.put(blob);
          const downloadUrl = await imageStoreRef.getDownloadURL();

          return downloadUrl;
          }
          catch(error){
              alertMessage(`error while uploading image is ${error?.message}`);
              Promise.reject(error);
          }
      }
 
      return {image, pickImage, uploadImage}

}

export default useImagePicker