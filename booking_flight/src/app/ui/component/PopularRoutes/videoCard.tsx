'use client';
import { inter, poppins} from "../asset/font";
import { useRef } from "react";

export default function VideoCard({videoLink,cityName} : {videoLink: string,cityName : string}) {
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
    return (
        <div className="flex-center gap-6  flex-col transition duration-500 ease-in-out">
            <video 
            ref={videoRef}
            className="h-[500px] w-[400px] transition duration-500 ease-in-out cursor-pointer rounded-xl hover:scale-105" 
            src={videoLink}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={handleMouseEnter}>
            </video>
            <label className={`text-4xl font-bold ${poppins.className}`}>{cityName}</label>
        </div>
    )
}