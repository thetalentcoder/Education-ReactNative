import React, { useCallback, useState } from "react";
import { ScrollView, TouchableOpacity, View, Text, Image, Modal, ActivityIndicator, Platform, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from 'expo-image-picker';
import storage from '@react-native-firebase/storage';
import { useDispatch, useSelector } from "react-redux";
import { setUser, updateAvatar } from "src/redux/userSlice";
import styles from "./AvatarUploadStyle";
import { PTFEButton } from "src/components/button";
import SectionHeaderX from "src/sections/Common/SectionHeaderX";
import { getMe, updateUser } from "src/actions/user/user";
import auth from '@react-native-firebase/auth';
import { firebase } from "src/config/firebase-config";

export default function AvatarUpload() {
    const { user } = useSelector((state: any) => state.userData);
    const dispatch = useDispatch();
    const navigation: any = useNavigation();

    const [selectedImage, setSelectedImage] = useState<string>("");
    const [uploading, setUploading] = useState<boolean>(false);
    const [transferred, setTransferred] = useState<number>(0);
    
    const imageSource = selectedImage ? { uri: selectedImage } : { uri: user?.avatarUrl };

    // Navigate back to the profile
    const gotoProfile = useCallback(() => {
        navigation.goBack();
    }, [navigation]);

    // Open image picker
    const pickImageHandler = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
        } else {
            Alert.alert("No Image Selected", "You did not select any image.");
        }
    };

    const uploadImage = async () => {
        if (!selectedImage) {
            Alert.alert("No Image Selected", "Please select an image to upload.");
            return;
        }
    
        const uri = selectedImage;
        const filename = uri.substring(uri.lastIndexOf('/') + 1);
        const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
        setUploading(true);
        setTransferred(0);
    
        try {
            const task = firebase.storage().ref(`uploads/${filename}`).putFile(uploadUri);
            task.on('state_changed', snapshot => {
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setTransferred(progress);
            });
            await task;
            // Update user avatar in the backend
            try {
                const downloadUrl = await firebase.storage().ref(`uploads/${filename}`).getDownloadURL();
                console.log("this si download url", downloadUrl);
                const responseData = await updateUser(user._id, downloadUrl);
                console.log("thsis i responseData0", responseData);
                if (responseData.avatarUrl) {
                    const userInfo = await getMe();            
                    dispatch(setUser(userInfo)); 
                    Alert.alert("Upload Successful", "Your photo has been uploaded successfully!");
                }
            } catch (err: any) {
                console.error("Error updating user:", err.message);
                Alert.alert("Error", "Failed to update user profile. Please try again.");
                throw err; // Ensure the error propagates
            }    
            setUploading(false);        
            setSelectedImage("");
            setTransferred(0);
        } catch (error: any) {
            console.error("Upload Error:", error);
            Alert.alert("Upload Failed", error || "An unknown error occurred.");
        } finally {
            setUploading(false);
            setTransferred(0);
        }
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#FF675B', '#87C6E8']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 2 }}
                style={styles.upperGradientContainer}
            />
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
                        text="UPLOAD PHOTO"
                        type="rounded"
                        color="#87C6E8"
                        onClick={uploadImage}
                    />
                </View>
            </View>
            <Modal
                transparent={true}
                animationType="slide"
                visible={uploading}
                onRequestClose={() => setUploading(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <ActivityIndicator size="large" color="#0000ff" />
                        <Text style={styles.modalText}>
                            {transferred > 0 ? `Uploading... ${transferred}%` : "Starting upload..."}
                        </Text>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
