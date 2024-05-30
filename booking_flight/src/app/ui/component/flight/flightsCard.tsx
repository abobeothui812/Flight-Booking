import { FlightData } from "next/dist/server/app-render/types"
import { HiOutlineMinus } from "react-icons/hi"
import Link from "next/link"
import EachFlight from "./EachFlight"
export default function FlightsCard() {
    return(
        <div className="w-[900px] h-[400px] flex flex-row shadow-sm rounded-lg border-2">
            <div className="min-w-[700px] border-r-2 px-3 py-5">
                <EachFlight></EachFlight>
                <EachFlight></EachFlight>
            </div>
            
            <div className="flex flex-grow flex-col justify-center items-center">
                <p>$50</p>
                <button className="BlueBtn">
                    <Link href='/flight/booking'>Select this flight</Link>
                </button>
            </div>
        </div>
    )
}