import { toast } from 'react-toastify';
import { apiCall } from 'api';
import { Filters } from '../../types/global';
import { Notification, PostNotificationRequest, NotificationResponse, NotificationRequest } from './types';

export const getNotifications = async (): Promise<NotificationResponse> => {
    try {
        const request = await apiCall();
        const { data } = await request({ url: `notification`, method: 'GET' });
        return data;
    } catch (error: any) {
        return Promise.reject(error);
    }
};

export const createNotification = async (payload: NotificationRequest): Promise<Notification> => {
    try {
        const request = await apiCall();
        const { data } = await request({ url: `notification`, method: 'POST', data: payload });
        toast.success('Notification successfully created!')
        return data;
    } catch (error: any) {
        return Promise.reject(error);
    }
};

export const editNotification = async ( payload: PostNotificationRequest): Promise<Notification> => {
    try {
        const request = await apiCall();
        const { data } = await request({ url: `notification`, method: 'PUT', data: payload });
        toast.info('Notification updated!')
        return data;
    } catch (error: any) {
        return Promise.reject(error);
    }
};
export const getNotificationsWithFilter = async (params?: Filters): Promise<NotificationResponse> => {
    try {
        const request = await apiCall();
        const { data } = await request({ url: `notification/getNotifications`, method: 'POST', data: params });
        console.log('data', data)
        return data;
    } catch (error: any) {
        return Promise.reject(error);
    }
};

export const deleteNotification = async (ids: string[]): Promise<void> => {
    try {
        console.log('ids', ids)
        const request = await apiCall();
        await request({ url: `notification`, method: 'DELETE', data: { notification: ids } });
        toast.error(`Notification${ids.length === 1 ? '' : 's'} deleted!`);
    } catch (error: any) {
        return Promise.reject(error);
    }
};

export const getNotification = async (id: string): Promise<Notification> => {
    try {
        const request = await apiCall();
        const { data } = await request({ url: `notification/${id}`, method: 'GET' });
        return data;
    } catch (error: any) {
        return Promise.reject(error);
    }
};
