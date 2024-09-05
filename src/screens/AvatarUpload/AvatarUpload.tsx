import React, { useCallback, useState } from "react";
import { ScrollView, TouchableOpacity, View, Text, Image, Modal, ActivityIndicator, Platform, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";


import styles from "./AvatarUploadStyle";
import { PTFEButton } from "src/components/button";
import { scale } from "src/config/scale";
import { useDispatch, useSelector } from "react-redux";
import SectionHeaderX from "src/sections/Common/SectionHeaderX";
import * as ImagePicker from 'expo-image-picker';
import storage from '@react-native-firebase/storage';
import { getMe, updateUser } from "src/actions/user/user";
import { updateAvatar } from "src/redux/userSlice";

export default function AvatarUpload() {
    const { user } = useSelector((state) => state.userData);
    const dispatch = useDispatch();

    const navigation: any = useNavigation();
    const [selectedImage, setSelectedImage] = useState("");
    const [uploadSuccess, setUploadSuccess] = useState(false);

    const [uploading, setUploading] = useState(false);
    const [transferred, setTransferred] = useState(0);

    const imageSource = selectedImage ? { uri: selectedImage } : { uri: user?.avatarUrl };

    const gotoProfile = useCallback(() => {
        setUploadSuccess(false);
        navigation.goBack()
    }, [navigation]);



    const pickImageHandler = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            console.log(user._id)
            setSelectedImage(result.assets[0].uri);
        } else {
            alert('You did not select any image.');
        }
    };

    const uploadImage = async () => {
        /*
        const uri = selectedImage;
        const filename = uri.substring(uri.lastIndexOf('/') + 1);
        const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;

        setUploading(true);
        setTransferred(0);

        const task = storage()
          .ref(filename)
          .putFile(uploadUri);
        // set progress state
        task.on('state_changed', snapshot => {
          setTransferred(
            Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000
          );
        });
        try {
            await task;
        } catch (e) {
            console.error(e);
            setUploadSuccess(false);
        }
        setUploading(false);
        setUploadSuccess(true);
        Alert.alert(
          'Photo uploaded!',
          'Your photo has been uploaded to Firebase Cloud Storage!'
        );
        setSelectedImage("");
        */
      };

    const updateUserAvatar = async () => {
        // setUploading(true);
        // try {
            
        // } catch (error) {
        //     setUploading(false);
        //     console.log(error);
        //     alert('Upload failed');
        // }
    }


    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#FF675B', '#87C6E8']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 2 }}
                style={styles.upperGradientContainer}
            >
            </LinearGradient>
            <View style={styles.headerContainer}>
                <SectionHeaderX title="Upload Photo" goBack={gotoProfile} />
            </View>
            <View style={styles.innerContainer}>
                <View style={styles.imageContainer}>
                    <Image source={imageSource} style={styles.image} />
                </View>
                <View style={styles.buttonContainer}>
                    <PTFEButton
                        text="CHOOSE PHOTO"
                        type="rounded"
                        color="#FF675B"
                        onClick={pickImageHandler}
                    />
                    <PTFEButton
                        text="USE THIS PHOTO"
                        type="rounded"
                        color="#87C6E8"
                        onClick={uploadImage}
                    />
                </View>
            </View>
            <Modal
                transparent={true}
                animationType="slide"
                visible={uploading || uploadSuccess}
                onRequestClose={() => {
                    setUploading(false);
                    setUploadSuccess(false);
                }}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        {uploading ? (
                            <>
                                <ActivityIndicator size="large" color="#0000ff" />
                                <Text style={styles.modalText}>Uploading...</Text>
                            </>
                        ) : (
                            <>
                                <Text style={styles.modalText}>Image uploaded successfully!</Text>
                                <PTFEButton
                                    text="Go to Profile"
                                    type="rounded"
                                    color="#87C6E8"
                                    onClick={gotoProfile}
                                />
                            </>
                        )}
                    </View>
                </View>
            </Modal>
        </View>
    )
}
