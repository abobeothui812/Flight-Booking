'use client'
import { useState, useRef } from "react";
import { useEffect } from "react";
import { lusitana, poppins } from "../asset/font";
import { fetchLocation } from "@/app/lib/data";
import { Location } from "@/app/lib/definition";
import 'react-calendar/dist/Calendar.css';
export default function DestinationCard({ type, city, airport,inputCity,inputCountry, LocationData2 } : { type : string, city : string, airport : string, inputCity:string,inputCountry : string, LocationData2 : Location[]}) {
    const [searchMenuState,setSearchMenuState] = useState(false);
    const node = useRef<HTMLDivElement>(null);
    const [selectedCity, setSelectedCity] = useState(city);
    const [selectedCountry,setSelectedCountry] = useState("Vietnam");
    const [selectedAirport, setSelectedAirport] = useState(airport);
    const changeSearchMenuState = () => {
        setSearchMenuState(!searchMenuState);
    };
    const handleClick = (newcity : string, newairport : string,newCountry : string) => {
        setSelectedCity(newcity);
        setSelectedAirport(newairport);
        setSelectedCountry(newCountry);
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
        
        <div onClick={changeSearchMenuState} className="flex flex-col flex-shrink-0 justify-around cursor-pointer border-r-2 hover:bg-gray-100 effect  p-4 items-start rounded-l-2xl min-w-[320px] max-w-[320px] h-full">
            <span className="text-slate-400 text-md">{type === "Departure" ? "From" : "To"}</span>
            <div className="flex flex-col w-full">
            <h1 className={`${poppins.className} flex flex-1 overflow-hidden text-ellipsis whitespace-nowrap w-full  text-5xl font-bold `}>{selectedCity}</h1>
            <span className="text-slate-400 overflow-hidden text-ellipsis whitespace-nowrap text-md">{selectedAirport}</span>
            </div>
            
            <div ref={node}  className={`absolute  ${searchMenuState ? 'block' : 'hidden'} transform translate-y-28 tran-x-  bg-white w-[300px] h-[280px] border-2 border-gray-200`}>
                <input onClick={(e) => e.stopPropagation()} onChange={(e) => setSelectedCity(e.target.value)}  type="text"  placeholder="From..." className="w-full font-semibold h-[50px] border-b-2" />
                <input type="hidden" name={inputCity} value={selectedCity} />
                <input type="hidden" name={inputCountry} value={selectedCountry} />
                <div className="flex flex-col px-2">
                <h3 className={`text-slate-400 font-bold ${poppins.className}`}>POPULAR CITES</h3>
                <ul className="overflow-auto h-[200px]">
                    {
                        LocationData2.map((l : Location) => (
                            <li onClick={() => handleClick(l.city,l.airportname,l.country)}  
                            className="flex justify-start items-center gap-2 hover:bg-slate-300" 
                            key={l.airportid}>
                                <p>✈️</p>
                                <div>
                               <h5 className="text-xl font-semibold font-sans">{l.city}</h5>
                               <p className="text-sm text-slate-400 ">{l.name}</p> 
                               
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