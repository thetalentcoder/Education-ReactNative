import { toast } from 'react-toastify';

import { Student, StudentsResponse } from './types';

import { apiCall } from 'api';
import { StoreStudentRequest, PutStudentRequest } from 'api/students/types';
import { Filters } from '../../types/global';

const formatPayload = (student: StoreStudentRequest | PutStudentRequest) => {
  const formData = new FormData();

  formData.append('role', student.role);
  formData.append('name', student.name);
  formData.append('email', student.email);
  formData.append('subscription', JSON.stringify(student.subscription));

  if (student.groupId) formData.append('groupId', student.groupId);
  if (student.organizationId) formData.append('organizationId', student.organizationId);
  if (student.image) formData.append('image', student.image);
  if (student.deleteImage) formData.append('deleteImage', 'true');

  return formData;
};

export const fetchStudents = async (params?: Filters): Promise<StudentsResponse> => {
  try {
    const request = await apiCall();
    const { data } = await request({ url: `users/getStudents`, method: 'POST', data: params });

    return data;
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const postStudent = async (student: StoreStudentRequest) => {
  const formData = formatPayload(student);

  try {
    const request = await apiCall();
    const { data } = await request({ url: `users/registerUser`, method: 'POST', data: formData }).then(({data}) => {
      toast.success('Student created!');
      return Promise.resolve(data);
    }, err => {
      toast.error(err.data.message);
      return Promise.reject(err);
    });
    return data;
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const putStudent = async (student: PutStudentRequest) => {
  const formData = formatPayload(student);
  formData.append('userId', student.userId);
  formData.append('password', student.password);
  formData.append('repeatPassword', student.repeatPassword);

  try {
    const request = await apiCall();
    const { data } = await request({ url: `users/adminEditUserInfo`, method: 'PATCH', data: formData });
    toast.info('Student updated!');

    return data;
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const fetchSingleStudent = async (userId: string): Promise<Student> => {
  try {
    const request = await apiCall();
    const { data } = await request({ url: `users/student`, method: 'GET', params: { userId } });
    return data;
  } catch (error: any) {
    return Promise.reject(error);
  }
};
