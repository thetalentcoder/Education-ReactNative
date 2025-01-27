import { toast } from 'react-toastify';
import { PostScenarioRequest, Scenario, ScenarioResponse, UpdateScenarioRequest } from './types';

import { apiCall } from 'api';
import { Filters } from '../../types/global';
import { reactQueryConfig } from 'lib/react-query';

export const getScenarios = async (): Promise<ScenarioResponse> => {
    try {
      const request = await apiCall();
      const { data } = await request({ url: `scenario`, method: 'GET'});
      return data;
    } catch (error: any) {
      return Promise.reject(error);
    }
};

export const fetchSingleScenario = async (id: string): Promise<Scenario> => {
  try {
    const request = await apiCall();
    const { data } = await request({ url: `scenario/scenario`, method: 'GET', params: { id } });
    return data;
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const getScenariosWithFilter = async (params?: Filters): Promise<ScenarioResponse> => {
    try {
      const request = await apiCall();
      const { data } = await request({ url: `scenario/getScenarios`, method: 'POST', data: params });
      return data;
    } catch (error: any) {
      return Promise.reject(error);
    }
};

export const storeScenario = async (payload: PostScenarioRequest): Promise<Scenario> => {
    try {
        const request = await apiCall();
        const { data } = await request({ url: `scenario`, method: 'POST', data: payload });
        toast.success('Scenario created!');
        return data;
    } catch (error: any) {
        return Promise.reject(error);
    }
};

export const updateScenario = async (payload: UpdateScenarioRequest): Promise<Scenario> => {
    try {
      const request = await apiCall();
      const { data } = await request({ url: `scenario`, method: 'PUT', data: payload });
      toast.info('Scenario updated!');
      return data;
    } catch (error: any) {
      return Promise.reject(error);
    }
};

export const deleteScenarios = async (ids: string[]): Promise<void> => {
  try {
    const request = await apiCall();
    await request({ url: `scenario`, method: 'DELETE', data: { scenarios: ids } });
    toast.error(`Scenario${ids.length === 1 ? '' : 's'} deleted!`);
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const getImgUrl = async (formData: FormData) => {
  try 
  {
      const request = await apiCall();
      const { data } = await request({ url: `scenario/scenario/image`, method: 'POST', data: formData });
      return data.result;
  } catch (error: any) {
      return Promise.reject(error);
  }
};
