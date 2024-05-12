'use client'
import clsx from "clsx";
import { useState, useRef } from "react";
import { useEffect } from "react";
import { lusitana, poppins } from "./font";
import DateInput from "./dateInput";
import DestinationCard from "./component/DestinationCard";
import { buttons } from "../lib/place-holder";
export default function Booking() {
    const [bookingType,BookingType] = useState("Bussiness Class");
    useEffect(() => {
        // Lưu trạng thái ban đầu của bookingType vào useState
        BookingType("Business Class");
    }, []);
    const ToggleType = ( name : string ) =>{
        BookingType(name);
        
    }
    
    return (
      <div className="rounded-3xl mt-20  border-2 flex-center gap-8 flex-col shadow-md  w-[1300px] px-2 h-[300px] ">
         <div className="flex-center"
>            {
                buttons.map((btn) => (
                    <button key={btn.name} onClick={() => ToggleType(btn.name)} className={`${poppins.className} rounded-[5px] w-[200px] h-[50px] border-gray-100 border-2 flex-center  px-8 py-4 ${bookingType === btn.name ? 'bg-blue-600 text-white transition duration-500 ease-in-out' : ''}`}>{btn.name}</button>
                ))
            }
        
         </div>
            {/* dropdown menu */}
         <div   className="w-full rounded-2xl border-2 border-gray-200  h-1/2 flex">
            
            <DestinationCard type="Depature" city="Ha Noi" airport="Noi Bai Airport" ></DestinationCard>
            <DestinationCard type="Destination" city="Ho Chi Minh City" airport="Tan Son Nhat Airport" ></DestinationCard>
            
            <div className="flex flex-row ">
            <DateInput type="Depature"></DateInput>
            <DateInput type="Return"></DateInput>
            </div>
            
                        

            
        </div>
        
         
      </div>
    );
}