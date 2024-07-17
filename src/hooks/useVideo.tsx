import React, { useEffect, useState } from "react";

export const useVideo = () => {
    const [thumbnailUrl, setThumbnailUrl] = useState('');
    const [videoUrl, setVideoUrl] = useState('');
    const [video, setVideo] = useState('');

    useEffect(() => {
        const VIMEO_ID = '953289606';
        fetch(`https://player.vimeo.com/video/${VIMEO_ID}/config`)
            .then(res => res.json())
            .then(res => {
                setThumbnailUrl(res.video.thumbs['640']);
                setVideoUrl(res.request.files.hls.cdns[res.request.files.hls.default_cdn].url);
                setVideo(res.video);

                console.log(res.request.files.hls.cdns[res.request.files.hls.default_cdn].url);
            });
    }, []);

    return { thumbnailUrl, videoUrl, video };
}