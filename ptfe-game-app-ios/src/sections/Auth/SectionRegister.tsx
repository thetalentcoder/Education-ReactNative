import React from "react";
import { View, Text } from "react-native";

import { PTFEButton, PTFELinkButton } from "src/components/button";
import PartRegister from "src/parts/Auth/PartRegister";
import styles from "./SectionRegisterStyle";

type Props = {
    setEmail:React.Dispatch<React.SetStateAction<string>>;
    setFirstName:React.Dispatch<React.SetStateAction<string>>;
    setLastName:React.Dispatch<React.SetStateAction<string>>;
    setPassword:React.Dispatch<React.SetStateAction<string>>;
    password: string;
    passwordConfirm: string;
    firstname: string;
    lastname: string;
    email: string
    SetPasswordConfirm:React.Dispatch<React.SetStateAction<string>>;
    onRegister:() => void;
    onGoBack:() => void;
}

export default function SectionRegister({
    setEmail,
    setFirstName,
    setLastName,
    setPassword,
    firstname,
    lastname,
    email,
    password,
    passwordConfirm,
    SetPasswordConfirm,
    onRegister,
    onGoBack,
}: Props) {
    return(
        <View style={styles.container}>
            <View style={styles.loginFormContainer}>
                <PartRegister 
                    setEmail={setEmail}
                    setFirstName={setFirstName}
                    setLastName={setLastName}
                    email={email}
                    firstname={firstname}
                    lastname={lastname}
                    password={password}
                    passwordConfirm={passwordConfirm}
                    setPassword={setPassword}
                    SetPasswordConfirm={SetPasswordConfirm}
                />
            </View>

            <View style={styles.buttonContainer}>
                <PTFEButton
                    text="REGISTER"
                    type="rounded"
                    color="#FF675B"
                    onClick={onRegister}
                />
                <View style={styles.textContainer}>
                    <Text></Text>
                    <Text style={styles.text}>Already have an account?</Text>
                    <PTFELinkButton
                        text="Back to login"
                        color="#FF675B"
                        underlined={false}
                        onClick={onGoBack}
                    />
                    <Text></Text>
                </View>
            </View>
        </View>
    );
}