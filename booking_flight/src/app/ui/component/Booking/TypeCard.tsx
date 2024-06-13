'use client'
import { useState, useRef } from "react";
import { useEffect } from "react";
import { lusitana, poppins } from "../asset/font";
import IncreaseNum from "./IncreaseNum";
export default function TypeCard() {
    const [searchMenuState,setSearchMenuState] = useState(false);
    const node = useRef<HTMLDivElement>(null);
    const  [numberOfTravelers, setNumberOfTravelers] = useState(1);
    const  [numberOfAdults, setNumberOfAdults] = useState(1);
    const  [numberOfChildren, setNumberOfChildren] = useState(0);
    const  [numberOfInfants, setNumberOfInfants] = useState(0);
    const  [seatClass, setSeatClass] = useState("First Class");
    const  [isChecked, setIsChecked] = useState(false);
    const changeSearchMenuState = () => {
        setSearchMenuState(!searchMenuState);
    };
    const updateChange =() =>{
        setNumberOfTravelers(numberOfAdults + numberOfChildren + numberOfInfants);
        if(isChecked){
            setNumberOfTravelers(9);
        }
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
        
        <div onClick={changeSearchMenuState} className="flex effect flex-col justify-around cursor-pointer rounded-r-xl hover:bg-gray-100 p-4 items-start  w-[320px]  h-full">
            <span className="text-slate-400 text-md">Travelers & Ticket</span>
            <div className="flex flex-col">
                <div className="flex justify-center overflow-hidden text-ellipsis whitespace-nowrap items-baseline gap-3">
                    <h3  className="text-5xl font-sans font-bold">{numberOfTravelers}
                    </h3><p className="font-sans font-medium text-2xl">Travelers</p>
                </div>
                <p className={`${poppins.className}   text-md text-slate-400`}>{seatClass}</p>
            </div>
            
            <div ref={node} onClick={(e) => e.stopPropagation()}  className={`absolute   ${searchMenuState ? 'block' : 'hidden'} py-2 px-3 gap-4 flex justify-center   flex-col  rounded-md   bg-white w-[250px] h-[450px] border-2 border-gray-200`}>
                <div  className="flex flex-col gap-1 ">
                    <IncreaseNum type="Adult" numberOfpeople={numberOfAdults} subscript="(12+ Years)" setNumberOfpeople={setNumberOfAdults}></IncreaseNum>
                    <IncreaseNum type="Children" numberOfpeople={numberOfChildren} subscript="(2-12 Years)" setNumberOfpeople={setNumberOfChildren}></IncreaseNum>
                    <IncreaseNum type="Infant" numberOfpeople={numberOfInfants} subscript="(0-2 Years)" setNumberOfpeople={setNumberOfInfants}></IncreaseNum> 
                </div>
                <input type="hidden" name="Adults" value={numberOfAdults} />
                <input type="hidden" name="Children" value={numberOfChildren} />
                <input type="hidden" name="Infants" value={numberOfInfants}/>
                <input type="hidden" name="TotalPassengers" value={numberOfTravelers} />
                <div className="flex-center gap-2 rounded-md p-2 bg-slate-100 ">
                    <input checked={isChecked} onChange={() => setIsChecked(!isChecked)}  type="checkbox" />
                    <p > 9 travelers</p>
                </div>
                <hr />
                <div className="flex-center flex-col gap-2 ">
                    <input type="button"  value="Business" onClick={() =>setSeatClass("Business")} className="TypeofTicketBtn cursor-pointer "/>
                    <input type="button"  value="First Class" onClick={() =>setSeatClass("First Class")} className="TypeofTicketBtn cursor-pointer"/>
                    <input type="button"  value="Economy" onClick={() =>setSeatClass("Economy")} className="TypeofTicketBtn cursor-pointer"/>
                </div>
                <input type="hidden" value={seatClass} name="seatClass" />
                <div className="flex-center">
                <button type="button" onClick={updateChange} className="BlueBtn w-[100px] h-[50px]">Done</button>
                </div>
            </div>

        </div>
        )
}