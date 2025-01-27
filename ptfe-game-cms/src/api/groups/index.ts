import { toast } from 'react-toastify';

import { GroupsResponse, PostGroupRequest, UpdateGroupRequest } from './types';

import { apiCall } from 'api';
import { Filters } from '../../types/global';

const formatPayload = (group: PostGroupRequest | UpdateGroupRequest) => {
  const formData = new FormData();
  formData.append('name', group.name);
  formData.append('type', group.type);
  formData.append('organizationId', group.organizationId);
  formData.append('isActive', group.isActive.toString());
  if (group.image) formData.append('image', group.image);
  if (group.deleteImage) formData.append('deleteImage', 'true');

  return formData;
};

export type FetchGroupsPayload = Filters & { organizationId?: string };

export const fetchGroups = async (payload?: FetchGroupsPayload): Promise<GroupsResponse> => {
  try {
    const request = await apiCall();
    const { data } = await request({
      url: `groups/getGroups`,
      method: 'POST',
      data: payload
    });

    return data;
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const postGroup = async (group: PostGroupRequest) => {
  const formData = formatPayload(group);

  try {
    const request = await apiCall();
    const { data } = await request({ url: `groups`, method: 'POST', data: formData });
    toast.success('Group created!');

    return data;
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const updateGroup = async (group: UpdateGroupRequest) => {
  const formData = formatPayload(group);
  formData.append('groupId', group.groupId);

  try {
    const request = await apiCall();
    const { data } = await request({ url: `groups`, method: 'PUT', data: formData });
    toast.info('Group updated!');

    return data;
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const deleteGroup = async (ids: string[]) => {
  try {
    const request = await apiCall();
    await request({ url: `groups`, method: 'DELETE', data: { groupIds: ids } });

    toast.error('Group deleted!');
  } catch (error: any) {
    return Promise.reject(error);
  }
};
