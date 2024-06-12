import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, signOut } from "@firebase/auth"
import { auth } from "src/config/firebase-config"
// import { API_URL } from "@env";
const API_URL = process.env.EXPO_PUBLIC_API_URL;

console.log(`${API_URL}/api/user`);

export const login = async (email: string, password: string) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        return user;
    } catch(error) {
        console.log(error.message);
        throw error;
    }
}

export const logout = async () => {
    try {
        const user = await signOut(auth);
        return user;
    } catch (error) {
        const errorCode = error?.code;
        const errorMessage = error?.message;
        console.error("Logout error:", errorCode, errorMessage);
        throw error;
    }
}

export const signup = async (email: string, password: string) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);

        console.log(userCredential.user);

        await emailVerification();

        const user = userCredential.user;
        console.log("User registered:", user);
        return user;
    } catch (error) {
        throw error;
    }
}

export const emailVerification = async () => {
    const user = auth.currentUser;
    try {
        await sendEmailVerification(auth.currentUser, {
            handleCodeInApp: true,
            url: "https://ptfe-game.firebaseapp.com",
        }).then(() => {
            console.log("Verification Sent");
        })
    } catch (error) {
        const errorCode = error?.code;
        const errorMessage = error?.message;
        console.error("Email verification error:", errorCode, errorMessage);
        throw error;
    }
}

export const forgotPassword = async (email: string) => {
    try {
        await sendPasswordResetEmail(auth, email);
    } catch(error) {
        console.log(error.message);
        throw error;
    }
}

export const userRegister = async (email: string, fullName: string) => {
    console.log(`${API_URL}/api/user`);
    const response = await fetch(`${API_URL}/api/user`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            fullname: fullName,
        }),
    });

    console.log(response);
}