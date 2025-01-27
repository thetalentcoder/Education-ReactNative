import { toast } from 'react-toastify';
import { apiCall } from 'api';
import { Filters } from '../../types/global';
import { SliderResponse, AddSliderRequest, PostSliderRequest, Slider } from './types';


export const addSlider = async (payload: AddSliderRequest) => {
    try {
        console.log("this is addslider api", payload)
        const request = await apiCall();
        await request({ url: `slider`, method: 'POST', data: payload });
        toast.success('Slider successfully created!');
    } catch (error: any) {
        return Promise.reject(error);
    }
};

export const slidersWithFilter = async (params?: Filters): Promise<SliderResponse> => {
    try {
        const request = await apiCall();
        const { data } = await request({ url: `slider/getsliderswithfilter`, method: 'POST', data: params });
        console.log("this is filter slider", data)
        return data;
    } catch (error: any) {
        return Promise.reject(error);
    }
};

export const deleteSlider = async (ids: string[]): Promise<void> => {
    try {
        const request = await apiCall();
        await request({ url: `slider`, method: 'DELETE', data: { sliders: ids } });
        toast.error(`Slider${ids.length === 1 ? '' : 's'} deleted!`);
    } catch (error: any) {
        return Promise.reject(error);
    }
};

export const updateSlider = async (payload: PostSliderRequest): Promise<Slider> => {
    try {
        const request = await apiCall();
        const { data } = await request({ url: `video`, method: 'PUT', data: payload });
        console.log('payload', payload)
        toast.info('Slider updated!');
        return data;
    } catch (error: any) {
        return Promise.reject(error);
    }
};