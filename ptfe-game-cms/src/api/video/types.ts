
    export interface PostVideoRequest {
      id: string;
      title: string;
      description: string;
      vimeoId: string;
    }
    
    export type UpdateVideoRequest = PostVideoRequest & {
      id: string;
      vimeoId: string;
    };
    
    export interface Video {
      _id: string;
      title: string;
      description: string;
      vimeoId: string;
    }
    
    export interface AddVideoRequest {
      title: string;
      description: string;
      vimeoId: string;
    }
       
    export interface VideoResponse {
      result: Video[];
      total: number;
    }
    
    export type SavedVideo = {
      _id: string;
      title: string;
      description: string;
      vimeoId: string;
    };
    