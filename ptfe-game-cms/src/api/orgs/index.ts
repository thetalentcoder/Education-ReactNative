import { toast } from 'react-toastify';

import { Org, OrgsType, PostOrgRequest, UpdateOrgRequest } from './types';

import { apiCall } from 'api';
import { Filters } from 'types/global';

const formatPayload = (org: PostOrgRequest | UpdateOrgRequest) => {
  const formData = new FormData();
  formData.append('name', org.name);
  formData.append('type', org.type);
  formData.append('isActive', org.isActive.toString());
  if (org.image) formData.append('image', org.image);
  if (org.deleteImage) formData.append('deleteImage', 'true');

  return formData;
};

export const fetchOrgs = async (): Promise<Org[]> => {
  try {
    const request = await apiCall();
    const { data } = await request({ url: `organizations`, method: 'GET' });

    return data;
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const fetchOrgsWithParams = async (
  payload: Filters
): Promise<{
  result: Org[];
  total: number;
}> => {
  try {
    const request = await apiCall();
    const { data } = await request({
      url: `organizations/getOrganizations`,
      method: 'POST',
      data: payload
    });

    return data;
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const postOrg = async (org: PostOrgRequest) => {
  const formData = formatPayload(org);

  try {
    const request = await apiCall();
    const { data } = await request({ url: `organizations`, method: 'POST', data: formData });
    toast.success('Organization created!');

    return data;
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const updateOrg = async (org: UpdateOrgRequest) => {
  const formData = formatPayload(org);
  formData.append('organizationId', org.organizationId);

  try {
    const request = await apiCall();
    const { data } = await request({ url: `organizations`, method: 'PUT', data: formData });
    toast.info('Organization updated!');

    return data;
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const deleteOrg = async (ids: string[]) => {
  try {
    const request = await apiCall();
    await request({ url: `organizations`, method: 'DELETE', data: { organizationIds: ids } });
    toast.error('Organization deleted!');
  } catch (error: any) {
    return Promise.reject(error);
  }
};

// Types

export const fetchOrgsTypes = async (): Promise<OrgsType[]> => {
  try {
    const request = await apiCall();
    const { data } = await request({ url: `organizations/type`, method: 'GET' });

    return data;
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const postOrgsType = async (name: string) => {
  try {
    const request = await apiCall();
    const { data } = await request({ url: `organizations/type`, method: 'POST', data: { name } });
    toast.success('Organization type created!');

    return data;
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const updateOrgsType = async (body: { id: string; name: string }) => {
  try {
    const request = await apiCall();
    const { data } = await request({
      url: `organizations/type`,
      method: 'PUT',
      data: {
        organizationTypeId: body.id,
        name: body.name
      }
    });
    toast.info('Organization type updated!');

    return data;
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const deleteOrgsType = async (ids: string[]) => {
  try {
    const request = await apiCall();
    await request({ url: `organizations/type`, method: 'DELETE', data: { organizationTypeIds: ids } });
    toast.error('Organizations type deleted!');
  } catch (error: any) {
    return Promise.reject(error);
  }
};
