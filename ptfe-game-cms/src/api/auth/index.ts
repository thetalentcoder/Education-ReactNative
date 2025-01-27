import { toast } from 'react-toastify';
import { LoginRequest, ResetPasswodPayload, UpdateUserRequest } from './types';
import { setStorageItem } from 'utils/storage';
import axios from 'axios';
// import { apiCall } from 'api';
// import { putUser } from 'api/users';
// import { useAuthStore } from 'store/auth';

// import { auth } from 'config/firebase-config';
// import { signInWithEmailAndPassword } from 'firebase/auth';

export const login = async (body: LoginRequest): Promise<any> => {
  try {
    // const userCredential = await signInWithEmailAndPassword(auth, body.email, body.password);
    // const user = userCredential.user;
    // const token = await user.getIdToken();
    const response = await axios.post(`${process.env.REACT_APP_WOOCOMMERCE_API_URL}/wp-json/jwt-auth/v1/token`, {
      username: body.email,
      password: body.password,
    })
    const token = response.data.token;
    setStorageItem('TOKEN', token);
    toast.success('You have successfully logged in!');

    return { success: true, data: { email: response.data.user_email } };
  } catch (error: any) {
    return { success: false, data: error };
  }
}

export const updateUserInfo = async (body: UpdateUserRequest): Promise<any> => {
  try {
    // if (auth.currentUser) {
    //   if (body.newPassword && body.newPassword.length > 0) {
    //     await updatePassword(auth.currentUser, body.newPassword);
    //   }
    //   await putUser(body);

    //   return { 
    //     success: true,
    //     fullname: body.fullname,
    //     email: body.email,
    //     password: body.newPassword,
    //   };
    // }
  } catch (error: any) {
    return { success: false, data: error };
  }
}

export const forgotPassword = async (body: UpdateUserRequest): Promise<any> => {
  try {
    // if (auth.currentUser) {
    //   if (body.newPassword && body.newPassword.length > 0) {
    //     await updatePassword(auth.currentUser, body.newPassword);
    //   }
    //   await putUser(body);

    //   return { 
    //     success: true,
    //     fullname: body.fullname,
    //     email: body.email,
    //     password: body.newPassword,
    //   };
    // }
  } catch (error: any) {
    return { success: false, data: error };
  }
}
export const register = async (body: UpdateUserRequest): Promise<any> => {
  try {
  
  } catch (error: any) {
    return { success: false, data: error };
  }
}
export const resetPassword = async (data: ResetPasswodPayload): Promise<any> => {
  try {
  
  } catch (error: any) {
    return { success: false, data: error };
  }
}