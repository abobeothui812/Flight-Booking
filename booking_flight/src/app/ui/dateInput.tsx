'use client'
import flatpickr from "flatpickr"
import { poppins } from "./font";
import { useRef,useState,useEffect } from "react";
import Calendar from "react-calendar";
export default function DateInput( {type} :{type : string }) {
    const today = new Date();
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const day = dayNames[today.getDay()];
    const returnDay = dayNames[(today.getDay() + 2) % 7];
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const month = monthNames[today.getMonth()];
    const year = today.getFullYear();
    const date = today.getDate();
    const returnDate = (today.getDate() + 2) % 31;
    const node = useRef<HTMLDivElement>(null);
    const [selectedDate, setSelectedDate] = useState({day: day, date: date, month: month, year: year});
    const [searchMenuState,setSearchMenuState] = useState(false);
    const changeSearchMenuState = () => {
        setSearchMenuState(!searchMenuState);
    }; 
    useEffect(() => {
        const handleClickOutside = (e : MouseEvent) => {
            if (node.current && e.target instanceof Node && node.current.contains(e.target)) {
                return;
            }
            setSearchMenuState(false);
        }

        window.addEventListener("mousedown", handleClickOutside);

        return () => {
            window.removeEventListener("mousedown", handleClickOutside);
        }
    },[]);

    return (
        
            <div onClick={changeSearchMenuState} className="h-full w-1/2 flex p-3 justify-around items-start flex-col border-r-2 cursor-pointer hover:bg-gray-100 ">
                <p className={`${poppins.className} text-md text-slate-400 `}>{type === "Depature" ? "Depature" : "Return"}</p>
                <div className="flex flex-col">
                <div className="flex justify-center items-baseline gap-3"><h3  className="text-5xl font-sans font-bold">{date}</h3><p className="font-sans font-medium text-2xl">{month} {year}</p></div>
                <p className={`${poppins.className} text-md text-slate-400 `}>{day}</p>
                </div>

                <div ref={node} className={`${searchMenuState ? "block" : "hidden"} absolute`}>
            
                <Calendar className="w-[300px] bg-white"></Calendar>
                </div>
            </div>

    )
}