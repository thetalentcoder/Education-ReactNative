import React, { useCallback, useState } from "react";
import { ScrollView, TouchableOpacity, View, Text, Image, Modal, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";


import styles from "./AvatarUploadStyle";
import { PTFEButton } from "src/components/button";
import { scale } from "src/config/scale";
import { useDispatch, useSelector } from "react-redux";
import SectionHeaderSetting from "src/sections/Common/SectionHeaderSetting";
import * as ImagePicker from 'expo-image-picker';
// import {
//     ref,
//     uploadBytes,
//     getDownloadURL,
// } from "@firebase/storage";
// import { storage } from "src/config/firebase-config";
import { getMe, updateUser } from "src/actions/user/user";
import { updateAvatar } from "src/redux/userSlice";

export default function AvatarUpload() {
    const { user } = useSelector((state) => state.userData);
    const dispatch = useDispatch();

    const navigation: any = useNavigation();
    const [selectedImage, setSelectedImage] = useState("");
    const [uploading, setUploading] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(false);

    const imageSource = selectedImage ? { uri: selectedImage } : { uri: user.avatarUrl };

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
/*
    const updateUserAvatar = async () => {
        setUploading(true);
        try {
            const response = await fetch(selectedImage);
            const blob = await response.blob();

            const storageRef = ref(storage, `avatar/${Date.now()}`);
            await uploadBytes(storageRef, blob);
            const downloadURL = await getDownloadURL(storageRef);
            await updateUser(user._id, downloadURL)

            console.log(downloadURL);
            console.log("done");

            setUploading(false);
            setUploadSuccess(true);

            dispatch(updateAvatar(downloadURL));
        } catch (error) {
            setUploading(false);
            console.log(error);
            alert('Upload failed');
        }
    }
*/

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
                <SectionHeaderSetting title="Upload Photo" goBack={gotoProfile} />
            </View>
            <View style={styles.imageContainer}>
                <Image source={imageSource} style={styles.image} />
            </View>
            <View style={styles.buttonContainer}>
                <PTFEButton
                    text="Choose Photo"
                    type="rounded"
                    color="#FF675B"
                    onClick={pickImageHandler}
                />
                <PTFEButton
                    text="Use this photo"
                    type="rounded"
                    color="#87C6E8"
                    onClick={() => {}/*updateUserAvatar*/}
                />
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