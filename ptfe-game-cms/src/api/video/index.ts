import { toast } from 'react-toastify';
import { apiCall } from 'api';
import { Filters } from '../../types/global';
import { VideoResponse, AddVideoRequest, PostVideoRequest, Video } from './types';


export const addVideo = async (payload: AddVideoRequest) => {
    try {
        const request = await apiCall();
        await request({ url: `video`, method: 'POST', data: payload });
        toast.success('Video successfully created!');
    } catch (error: any) {
        return Promise.reject(error);
    }
};

export const videosWithFilter = async (params?: Filters): Promise<VideoResponse> => {
    try {
        const request = await apiCall();
        const { data } = await request({ url: `video/getVideos`, method: 'POST', data: params });
        return data;
    } catch (error: any) {
        return Promise.reject(error);
    }
};

export const deleteVideos = async (ids: string[]): Promise<void> => {
    try {
        const request = await apiCall();
        await request({ url: `video`, method: 'DELETE', data: { videos: ids } });
        toast.error(`Video${ids.length === 1 ? '' : 's'} deleted!`);
    } catch (error: any) {
        return Promise.reject(error);
    }
};

export const updateVideo = async (payload: PostVideoRequest): Promise<Video> => {
    try {
        const request = await apiCall();
        const { data } = await request({ url: `video`, method: 'PUT', data: payload });
        console.log('payload', payload)
        toast.info('Video updated!');
        return data;
    } catch (error: any) {
        return Promise.reject(error);
    }
};