import React from "react";
import { View, Text } from "react-native";

import { PTFEEdit } from "src/components/edit";

import globalStyle from "src/theme/globalStyle";
import styles from "./PartRegisterStyle";

type Props = {
    setEmail:React.Dispatch<React.SetStateAction<string>>;
    setFirstName:React.Dispatch<React.SetStateAction<string>>;
    setLastName:React.Dispatch<React.SetStateAction<string>>;
    setPassword:React.Dispatch<React.SetStateAction<string>>;
    email: string;
    firstname: string;
    lastname: string;
    password: string;
    passwordConfirm: string;
    SetPasswordConfirm:React.Dispatch<React.SetStateAction<string>>;
}

export default function PartRegister({
    setEmail,
    setFirstName,
    setLastName,
    setPassword,
    email,
    firstname,
    lastname,
    password,
    passwordConfirm,
    SetPasswordConfirm,
}: Props) {
    return(
        <>
            <View style={styles.container}>
                <Text style={styles.title}>
                    Register Now
                </Text>
                <Text style={styles.subtitle}>
                    Email Address
                </Text>
                <PTFEEdit 
                    type="text"
                    initValue={email}
                    onChangeText={setEmail}
                />
                <View style={globalStyle.margin8}/>
                <Text style={styles.subtitle}>
                    First Name
                </Text>
                <PTFEEdit 
                    type="text"
                    initValue={firstname}
                    onChangeText={setFirstName}
                />
                <Text style={styles.subtitle}>
                    Last Name
                </Text>
                <PTFEEdit 
                    type="text"
                    initValue={lastname}
                    onChangeText={setLastName}
                />

                <View style={globalStyle.margin32}/>
                <Text style={styles.subtitle}>
                    Password
                </Text>
                <PTFEEdit 
                    type="password"
                    initValue={passwordConfirm}
                    onChangeText={SetPasswordConfirm}
                />
                <View style={globalStyle.margin8}/>
                <Text style={styles.subtitle}>
                    Confirm Password
                </Text>
                <PTFEEdit 
                    type="confirmpassword"

                    initValue={password}
                    onChangeText={setPassword}
                />
            </View>
        </>
    );
}