// import React, { useEffect, useState } from "react";

// type VideoData = {
//     thumbnailUrl: string;
//     videoUrl: string;
//     video: any;
// };

// export const useVideo = (VIMEO_ID: string = '953289606'): VideoData => {
//     const [thumbnailUrl, setThumbnailUrl] = useState<string>('');
//     const [videoUrl, setVideoUrl] = useState<string>('');
//     const [video, setVideo] = useState<any>(null);

//     useEffect(() => {
//         fetch(`https://player.vimeo.com/video/${VIMEO_ID}/config`)
//             .then(res => {
//                 if (!res.ok) {
//                     throw new Error('Failed to fetch video data');
//                 }
//                 return res.json();
//             })
//             .then(res => {
//                 if (res.video && res.video.thumbs && res.request && res.request.files && res.request.files.hls && res.request.files.hls.cdns) {
//                     const cdnKey = res.request.files.hls.default_cdn;
//                     setThumbnailUrl(res.video.thumbs['640'] || '');
//                     setVideoUrl(res.request.files.hls.cdns[cdnKey].url || '');
//                     setVideo(res.video);
//                 }
//             })
//             .catch(error => {
//                 console.error("Error fetching video data:", error);
//                 setThumbnailUrl('');
//                 setVideoUrl('');
//                 setVideo(null);
//             });
//     }, [VIMEO_ID]); 

//     return { thumbnailUrl, videoUrl, video };
// }


import React, { useEffect, useState } from "react";

type VideoData = {
    thumbnailUrl: string;
    videoUrl: string; // Direct video file URL (mp4 or m3u8)
    video: any; // Full video metadata
};

const VIMEO_API_BASE_URL = "https://api.vimeo.com/videos";
const ACCESS_TOKEN = "e4561dd47432804cb9434a423e8d28f8"; // Replace with your actual token

export const useVideo = (VIMEO_ID: string): VideoData => {
    const [thumbnailUrl, setThumbnailUrl] = useState<string>("");
    const [videoUrl, setVideoUrl] = useState<string>(""); // Direct video file URL
    const [video, setVideo] = useState<any>(null); // Full video metadata
    console.log("this is video hook page", VIMEO_ID);
    useEffect(() => {
        const fetchVideoData = async () => {
            try {
                const response = await fetch(`${VIMEO_API_BASE_URL}/${VIMEO_ID}`, {
                    headers: {
                        Authorization: `Bearer ${ACCESS_TOKEN}`, // Use your Vimeo API token
                    },
                });
                console.log("this is video hook page", response);
                if (!response.ok) {
                    throw new Error("Failed to fetch video data from Vimeo API");
                }

                const data = await response.json();

                // Extract thumbnail URL
                setThumbnailUrl(data.pictures.sizes[3]?.link || ""); // Adjust index for desired size

                // Extract the highest quality .mp4 file
                const mp4Files = data.files?.filter(
                    (file: any) => file.type === "video/mp4"
                );

                if (mp4Files?.length > 0) {
                    // Sort by resolution (height) and select the best quality
                    const bestFile = mp4Files.sort((a: any, b: any) => b.height - a.height)[0];
                    setVideoUrl(bestFile.link);
                } else if (data.play?.hls?.link) {
                    // Fallback to HLS (.m3u8) if no .mp4 files are available
                    setVideoUrl(data.play.hls.link);
                } else {
                    throw new Error("No playable video URL (mp4 or m3u8) found.");
                }

                setVideo(data); // Save full video metadata
            } catch (err) {
                console.error("Error fetching video data:", err, `${VIMEO_API_BASE_URL}/${VIMEO_ID}`);
                setThumbnailUrl("");
                setVideoUrl("");
                setVideo(null);
            }
        };

        fetchVideoData();
    }, [VIMEO_ID]);

    return { thumbnailUrl, videoUrl, video };
};
