import { auth } from "src/config/firebase-config";
import AsyncStorage from "@react-native-async-storage/async-storage";
// const API_URL = "https://4d26-88-216-2-162.ngrok-free.app";
const API_URL = "https://ptfe-game-backend-a0cc7b8d3a77.herokuapp.com";
const API_SSO_URL = "https://ninja.ptfinalexam.com";

// export const login = async (email: any, password: any) => {
//   try {
//     const userCredential = await auth.signInWithEmailAndPassword(
//       email,
//       password
//     );
//     const user = userCredential.user;
//     console.log("LOGIN RES ", JSON.stringify(user))
//     return user;
//   } catch (error: any) {
//     console.log(error.message);
//     throw error;
//   }
// };

export const login = async (username: string, password: string) => {
  const queryParams = new URLSearchParams({ username, password }).toString();
  try {
    const response = await fetch(
      `${API_SSO_URL}/wp-json/jwt-auth/v1/token?${queryParams}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        // `Server responded with status ${errorData.code}: ${errorData}-----------------${errorData[0]}--------------------${errorData.Error}`
        errorData.code
      );
    }

    const user = await response.json();
    await AsyncStorage.setItem("token", user?.token);
    console.log("LOGIN RES ", JSON.stringify(user));
    return user;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
      throw error;
    }

    throw new Error("An unknown error occurred");
  }
};

export const appleloginuser = async (username: string, password: string) => {
  try {
    const response = await fetch(
      `${API_URL}/api/user/appleloginuser/`,
      {
        method: "POST",
        headers: {
            'Content-Type': 'application/json', // Define Content-Type
            'Accept': 'application/json'
        },
        body: JSON.stringify({
          email: username,
          password: password
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.code
      );
    }

    const user = await response.json();
    await AsyncStorage.setItem("token", user?.token);
    console.log("LOGIN RES ", JSON.stringify(user));
    return user;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
      throw error;
    }

    throw new Error("An unknown error occurred");
  }
};



export const resetPassReq = async (email: string) => {
  try {
    const response = await fetch(
      `${API_SSO_URL}/wp-json/custom/v1/send-password-reset`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email }),
      }
    );

    const data = await response.json();

    if (data.message === "Password reset email has been sent.") {
      console.log(data.message);
      return true;
    } else {
      console.error("Failed to send password reset email:", data.message);
      return false;
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      throw error;
    }

    throw new Error("An unknown error occurred");
  }
};

// export const logout = async () => {
//   try {
//     const user = await auth.signOut();
//     return user;
//   } catch (error: any) {
//     const errorCode = error?.code;
//     const errorMessage = error?.message;
//     console.error("Logout error:", errorCode, errorMessage);
//     throw error;
//   }
// };
export const logout = async () => {
  try {
    await auth.signOut();
    await AsyncStorage.clear();
    console.log("User successfully logged out.");
  } catch (error: any) {
    console.error("Logout error:", error?.code, error?.message);
    throw error;
  }
};

export const signup = async (email: string, password: string) => {
  try {
    const userCredential = await auth.createUserWithEmailAndPassword(
      email,
      password
    );
    console.log(userCredential.user);

    await emailVerification();

    const user = userCredential.user;
    console.log("User registered:", user);
    return user;
  } catch (error) {
    throw error;
  }
};

export const emailVerification = async () => {
  const user = auth.currentUser;
  try {
    await auth.currentUser
      ?.sendEmailVerification({
        handleCodeInApp: true,
        url: "https://ptfe-game.firebaseapp.com",
      })
      .then(() => {
        ("Verification Sent");
      });
  } catch (error: any) {
    const errorCode = error?.code;
    const errorMessage = error?.message;
    console.error("Email verification error:", errorCode, errorMessage);
    throw error;
  }
};

export const forgotPassword = async (email: string) => {
  try {
    await auth.sendPasswordResetEmail(email);
  } catch (error: any) {
    console.log(error.message);
    throw error;
  }
};

export const userRegister = async (email: string, firstName: string, lastname: string, password: string) => {
  const response = await fetch(`${API_URL}/api/user/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      firstname: firstName,
      lastname: lastname,
      password: password
    }),
  });

  console.log(response);
};


export const updatePassword = async (newPassword: string) => {
  try {
    const user = auth.currentUser;
    user?.updatePassword(newPassword);

    return true;
  } catch (error: any) {
    const errorCode = error?.code;
    const errorMessage = error?.message;
    console.error("Logout error:", errorCode, errorMessage);
    return false;
  }
};
