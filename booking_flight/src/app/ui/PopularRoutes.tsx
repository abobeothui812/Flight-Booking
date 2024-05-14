'use client';
import { poppins,inter } from "./component/asset/font";
import { useRef } from "react";
import VideoCard from "./component/PopularRoutes/videoCard";
export default function PopularRoutes() {
    const videoRef = useRef<HTMLVideoElement>(null);

    const handleMouseEnter = () => {
        if (videoRef.current) {
            videoRef.current.play();
        }
    };

    const handleMouseLeave = () => {
        if (videoRef.current) {
            videoRef.current.pause();
        }
    };
    return(
        <div className="w-[1300px] flex flex-col gap-14 justify-center items-start">
            <h2 className={`${poppins.className} font-bold text-5xl`}>Popular Routes</h2>
            <div className="flex justify-center items-center gap-12">
                <VideoCard videoLink="/video/London.mp4" cityName="London"/>
                <VideoCard videoLink="/video/Paris.mp4" cityName="Paris"/>
                <VideoCard videoLink="/video/Tokyo.mp4" cityName="Tokyo"/>
                
            </div>
        </div>
    )
}