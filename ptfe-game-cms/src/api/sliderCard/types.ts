export interface SliderCard {
    _id: string;
    title: string;
    linkText: string;
    url: string;
    createdAt: Date;
}

export interface PostSliderCardRequest {
    id: string;
    title: string;
}

export interface AddSliderCardRequest {
    title: string;
    linkText: string;
    url: string;
}

export interface SliderCardResponse {
    result: SliderCard[];
    total: number;
}

