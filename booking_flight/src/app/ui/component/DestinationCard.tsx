'use client'
import { useState, useRef } from "react";
import { useEffect } from "react";
import { lusitana, poppins } from "../font";
import { Cities, buttons} from "../../lib/place-holder"
import 'react-calendar/dist/Calendar.css';
export default function DestinationCard({ type, city, airport } : { type : string, city : string, airport : string}) {
    const [bookingType,BookingType] = useState("Bussiness Class");
    const [searchMenuState,setSearchMenuState] = useState(false);
    const node = useRef<HTMLDivElement>(null);
    const [selectedCity, setSelectedCity] = useState({name: city, Airport: airport});
    useEffect(() => {
        // Lưu trạng thái ban đầu của bookingType vào useState
        BookingType("Business Class");
    }, []);
    const changeSearchMenuState = () => {
        setSearchMenuState(!searchMenuState);
    };
    const handleClick = (city : string, airport : string) => {
        setSelectedCity({name: city, Airport: airport});
        setSearchMenuState(false);
    
    }
    useEffect(() => {
        const handleClickOutside = (e : MouseEvent) => {
            if (node.current && e.target instanceof Node && node.current.contains(e.target)) {
                return;
            }
            setSearchMenuState(false);
        };
    
        window.addEventListener("mousedown", handleClickOutside);
    
        return () => {
            window.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    return (
        
        <div onClick={changeSearchMenuState} className="flex flex-col justify-around cursor-pointer border-r-2 hover:bg-gray-100  p-4 items-start rounded-l-2xl w-[320px] h-full">
            <span className="text-slate-400 text-md">{type === "Depature" ? "From" : "To"}</span>
            <div className="flex flex-col w-full">
            <h1 className={`${poppins.className} flex flex-1 overflow-hidden text-ellipsis whitespace-nowrap w-full  text-5xl font-bold `}>{selectedCity.name}</h1>
            <span className="text-slate-400 overflow-hidden text-ellipsis whitespace-nowrap text-md">{selectedCity.Airport}</span>
            </div>
            
            <div ref={node}  className={`absolute  ${searchMenuState ? 'block' : 'hidden'}  bg-white w-[360px] h-[300px] border-2 border-gray-200`}>
                <input onClick={(e) => e.stopPropagation()} type="text" placeholder="From..." className="w-full h-[50px] border-b-2" />
                <div className="flex flex-col px-2">
                <h3 className={`text-slate-400 font-bold ${poppins.className}`}>POPULAR CITES</h3>
                <ul className="overflow-auto h-[200px]">
                    {
                        Cities.map((city) => (
                            <li onClick={() => handleClick(city.name,city.airport)}  className="flex justify-start items-center gap-2 hover:bg-slate-300" key={city.name}>
                                <p>✈️</p>
                                <div>
                               <h5 className="text-xl font-semibold font-sans">{city.name}</h5>
                               <p className="text-sm text-slate-400 ">{city.airport}</p> 
                               </div>
                            </li>
                        ))
                    }
                </ul>
                </div>
                
            </div>
            
        </div>
        )
}
