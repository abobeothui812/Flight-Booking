'use client'
import flatpickr from "flatpickr"
import { poppins } from "../asset/font";
import { useRef,useState,useEffect } from "react";
import Calendar from "react-calendar";
export default function DateInput( {type,inputname} :{type : string,inputname : string }) {
    const [selectedDate, setSelectDate] = useState(new Date());
    const [formattedDate, setFormattedDate] = useState(formatDate(selectedDate));
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const day = dayNames[selectedDate.getDay()];
    const returnDay = dayNames[(selectedDate.getDay() + 2) % 7];
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const month = monthNames[selectedDate.getMonth()];
    const year = selectedDate.getFullYear();
    const date = selectedDate.getDate();
    const returnDate = (selectedDate.getDate() + 2) % 31;
    const node = useRef<HTMLDivElement>(null);
    const [searchMenuState,setSearchMenuState] = useState(false);
    const changeSearchMenuState = () => {
        setSearchMenuState(!searchMenuState);
    }; 
    function formatDate(date : Date) {
        const year = date.getFullYear();
        const month = date.getMonth() + 1; // getMonth() trả về tháng từ 0 (tháng 1) đến 11 (tháng 12)
        const day = date.getDate();

        return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    }
    const handleDateChange = (newDate: Date) => {
        setSelectDate(newDate);
        setFormattedDate(formatDate(newDate));
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
        
            <div onClick={changeSearchMenuState} className="h-full overflow-hidden text-ellipsis whitespace-nowrap w-1/2 effect flex-shrink-0 flex p-3 justify-around items-start flex-col border-r-2 cursor-pointer hover:bg-gray-100 ">
                <p className={`${poppins.className} text-md text-slate-400 `}>{type === "DepartureDate" ? "Departure" : "Return"}</p>
                <div className="flex flex-col flex-shrink-0 overflow-hidden text-ellipsis whitespace-nowrap">
                    <div className="flex justify-center overflow-hidden text-ellipsis whitespace-nowrap items-baseline gap-3">
                        <h3  className="text-5xl font-sans font-bold">{date }</h3>
                        <p className="font-sans flex flex-shrink-0  font-medium text-2xl overflow">{month} {year}</p>
                    </div>
                    <p className={`${poppins.className}   text-md text-slate-400 `}>{day }</p>
                </div>
        
                <div onClick={(e) => e.stopPropagation()} ref={node} className={`${searchMenuState ? "block" : "hidden"} w-[350px] h-[350px] flex justify-center items-end bg-white absolute`}>

                <Calendar locale="en"   onChange={(value, event) => handleDateChange(value as Date)} value={selectedDate}/>
                <input suppressHydrationWarning type="hidden" name={inputname} value={formattedDate} />
                </div>
            </div>

    )
}