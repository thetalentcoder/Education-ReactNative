import React, { useEffect, useState } from "react";

type VideoData = {
    thumbnailUrl: string;
    videoUrl: string;
    video: any;
};

export const useVideo = (VIMEO_ID: string = '953289606'): VideoData => {
    const [thumbnailUrl, setThumbnailUrl] = useState<string>('');
    const [videoUrl, setVideoUrl] = useState<string>('');
    const [video, setVideo] = useState<any>(null);

    useEffect(() => {
        fetch(`https://player.vimeo.com/video/${VIMEO_ID}/config`)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Failed to fetch video data');
                }
                return res.json();
            })
            .then(res => {
                if (res.video && res.video.thumbs && res.request && res.request.files && res.request.files.hls && res.request.files.hls.cdns) {
                    const cdnKey = res.request.files.hls.default_cdn;
                    setThumbnailUrl(res.video.thumbs['640'] || '');
                    setVideoUrl(res.request.files.hls.cdns[cdnKey].url || '');
                    setVideo(res.video);
                }
            })
            .catch(error => {
                console.error("Error fetching video data:", error);
                setThumbnailUrl('');
                setVideoUrl('');
                setVideo(null);
            });
    }, [VIMEO_ID]); 

    return { thumbnailUrl, videoUrl, video };
}
