
    export interface PostSliderRequest {
      id: string;
      title: string;
      content: string;
    }
    
    export type UpdateSliderRequest = PostSliderRequest & {
      id: string;
      sliderId: string;
    };
    
    export interface Slider {
      _id: string;
      title: string;
      content: string;
    }
    
    export interface AddSliderRequest {
      title: string;
      content: string;
    }
       
    export interface SliderResponse {
      result: Slider[];
      total: number;
    }
    
    export type SavedVideo = {
      _id: string;
      title: string;
      description: string;
      vimeoId: string;
    };
    