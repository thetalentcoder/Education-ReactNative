import { apiCall } from 'api';
import { User, UsersResponse } from './types';
import { toast } from 'react-toastify';
import { Filters } from 'types/global';
import { UpdateUserRequest } from 'api/auth/types';

export const fetchMe = async (): Promise<User> => {
  try {
    const request = await apiCall();
    const { data } = await request({ url: `user/me`, method: 'GET' });
    
    return {
      _id: data.id,
      fullname: data.fullname,
      email: data.email,
      role: data.role,
      password: data.password,
      subscription:data.subscription,
    }
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const fetchUsers = async (params?: Filters): Promise<UsersResponse> => {
  try {
    const request = await apiCall();
    const { data } = await request({ url: `user/getUsers`, method: 'POST', data: params });
    return data;
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const deleteUser = async (ids: string[]) => {
  try {
    console.log(ids);

    const request = await apiCall();
    await request({ url: `user/delete`, method: 'DELETE', data: { userIds: ids } });
    
    toast.error('User deleted!');
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const putUser = async (user: UpdateUserRequest): Promise<User> => {
  try {
    const request = await apiCall();
    const { data } = await request({ url: `user/${user.id}`, method: 'PUT', data: { fullname: user.fullname }});

    toast.success('User information successfully changed!');
    return data;
  } catch (error: any) {
    return Promise.reject(error);
  }
};