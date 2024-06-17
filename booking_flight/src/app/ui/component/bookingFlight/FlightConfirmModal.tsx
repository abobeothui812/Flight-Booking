'use client'
import { useRef,useState } from "react"
import { FaRegCalendarCheck } from "react-icons/fa"
import { FaLocationDot } from "react-icons/fa6"
import { RiFlightTakeoffFill } from "react-icons/ri"
import { RiCloseLargeFill } from "react-icons/ri"
import { FlightSearchInformation,searchParamInformation } from "@/app/lib/definition"
import { BookFlight } from "@/app/lib/action"
import Link from "next/link"
export default function FlightConfirmModal( {bookingid,flight,searchParams }:{bookingid : string,flight : FlightSearchInformation, searchParams : searchParamInformation}){
    const dialogRef = useRef<HTMLDialogElement>(null)
    const [dialogState,setDialogState] = useState(false);
    flight.departdate = new Date(flight.departdate).toLocaleDateString('en-US', {
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
      const openDialog = () => {
        dialogRef.current?.showModal();
        setDialogState(true);
       
        
      };
    
      const closeDialog = () => {
        dialogRef.current?.close();
        setDialogState(false);
        
      };
      
    return(
        <>
            <dialog ref={dialogRef} className={`w-[700px]  ${ dialogState ? "flex" : "hidden"} px-4 justify-start items-end flex-col rounded-md `}>
              <button className="w-[30px]  fixed flex-center h-[30px]" onClick={() => closeDialog()}>
                  <RiCloseLargeFill className="w-[20px] h-[20px]"></RiCloseLargeFill>
              </button>
              <div className="w-full h-full  flex justify-start items-center gap-7 flex-col px-4 py-4 border-black">
                <p className="text-6xl font-bold">Flight Details</p>
                <div className="w-full h-[320px]  gap-5 flex flex-col bg-gray-200 p-2 border-black">
                    <p className="text-4xl font-semibold">To {flight.arrivalcity}</p>
                    <div className="flex justify-center items-start gap-8 flex-col"  >
                    <p className="flex-center text-3xl"><FaRegCalendarCheck className="w-[30px] h-[30px]"></FaRegCalendarCheck>{flight.departdate}</p>
                    <p className="flex text-3xl"><FaLocationDot className="w-[30px] h-[30px]"></FaLocationDot>{flight.departairport} ({flight.departairportid}) </p>
                    <p className="flex text-3xl"><RiFlightTakeoffFill className="w-[30px] h-[30px]"></RiFlightTakeoffFill>{flight.airlinename}</p>
                    <p className="flex text-3xl"><FaLocationDot className="w-[30px] h-[30px]"></FaLocationDot> {flight.arrivalairport} ({flight.arrivalairportid})</p>
                    </div>
                </div>
                <Link href={`flight/${flight.flightnumber}/passengerDetails/${bookingid}`}
                 className="BlueBtn w-[250px] h-[50px] flex-center text-lg">Book from now ${flight.price}</Link>
              </div>
           </dialog>
            <button   className="BlueBtn w-[150px] h-[50px]" onClick={openDialog}>Select This Flight</button>
        </>
    )
}