import { toast } from 'react-toastify';
import { apiCall } from 'api';
import { Filters } from '../../types/global';
import { AddSliderCardRequest, PostSliderCardRequest, SliderCard, SliderCardResponse } from './types';


export const addSliderCard = async (payload: AddSliderCardRequest) => {
    try {
        const request = await apiCall();
        await request({ url: `slidercard`, method: 'POST', data: payload });
        toast.success('Card successfully created!');
    } catch (error: any) {
        return Promise.reject(error);
    }
};

export const getSliderCardsWithFilter = async (params?: Filters): Promise<SliderCardResponse> => {
    try {
        const request = await apiCall();
        const { data } = await request({ url: `slidercard/getSliderCards`, method: 'POST', data: params });
        return data;
    } catch (error: any) {
        return Promise.reject(error);
    }
};

export const deleteSliderCards = async (ids: string[]): Promise<void> => {
    try {
        const request = await apiCall();
        await request({ url: `slidercard`, method: 'DELETE', data: { sliderCards: ids } });
        toast.error(`Card${ids.length === 1 ? '' : 's'} deleted!`);
    } catch (error: any) {
        return Promise.reject(error);
    }
};

export const updateSliderCard = async (payload: PostSliderCardRequest): Promise<SliderCard> => {
    try {
        const request = await apiCall();
        const { data } = await request({ url: `slidercard`, method: 'PUT', data: payload });
        console.log('payload', payload)
        toast.info('Card updated!');
        return data;
    } catch (error: any) {
        return Promise.reject(error);
    }
};