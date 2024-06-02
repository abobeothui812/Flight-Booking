import { FaRegCalendarCheck } from "react-icons/fa"
import { FaLocationDot } from "react-icons/fa6"
import { RiFlightTakeoffFill } from "react-icons/ri"
export default function FlightDetail(){
    return(
        <div  className="bg-gray-100 h-20 flex flex-row">
            <FaRegCalendarCheck/>
            <hr className="flex rotate-90" />
            <FaLocationDot/>
            <RiFlightTakeoffFill/>

        </div>
    )
}