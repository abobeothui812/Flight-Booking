import { FlightData } from "next/dist/server/app-render/types"
import { HiOutlineMinus } from "react-icons/hi"
import Link from "next/link"
import EachFlight from "./EachFlight"
import { FlightSearchInformation } from "@/app/lib/definition"
import { searchParamInformation } from "@/app/lib/definition"
import FlightConfirmModal from "../bookingFlight/FlightConfirmModal"
import { BookFlight } from "@/app/lib/action"
export default async function FlightsCard( {flight,searchParams} : {flight : FlightSearchInformation,searchParams : searchParamInformation } ) {
    const bookingid= await BookFlight(flight.flightnumber,searchParams);
    
    return(
        <div className="w-[900px]  flex flex-row shadow-sm rounded-lg border-2">
            <div className={`min-w-[700px] ${searchParams.ticketType === "One Way" ? "h-[180px]" : "h-[400px]"  } border-r-2 px-4 py-4`}>
                <EachFlight fl ={flight} searchParams={searchParams}></EachFlight>
                
            </div>
            
            <div className="flex flex-grow flex-col gap-2 justify-center items-center">
                <p className="text-lg font-semibold">${flight.price}</p>
                <FlightConfirmModal bookingid={bookingid} flight={flight} searchParams={searchParams}></FlightConfirmModal>
            </div>
        </div>
    )
}