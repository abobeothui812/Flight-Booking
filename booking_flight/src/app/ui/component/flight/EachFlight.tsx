import { MdFlight} from "react-icons/md"
export default function EachFlight() {
    return(
        <div>
            <p className="font-semibold">June 10,2024 - Departure Time</p>
            <div className=" flex-row flex  justify-center items-start">
                        <div className="flex text-slate-700 gap-3 overflow  w-1/5 text-xl  flex-col justify-between items-center p-4">
                            <p className="text-4xl font-semibold">10:00</p>
                            <p className="text-md text-gray-500">Ho Chi Minh</p>
                        </div>
                        <div className="flex-center flex-col grow mt-5">
                            
                            <MdFlight className="w-[50px] h-[50px] gap-3  text-blue-600"></MdFlight>
                            <p className="text-md text-gray-500">2 h 0 m</p>
                            <p className="text-md text-gray-500">Direct</p>
                            
                        </div>
                        <div className="flex text-slate-700 gap-2 text-xl overflow w-1/5 flex-col justify-between items-center p-4">
                            <p className="text-4xl font-semibold">12:00 </p>
                            <div className="flex-center flex-col">
                            <p className="text-md text-gray-500">Ha Noi</p>
                            <p className="text-md text-gray-500 text-base">(ARN)</p>
                            </div>
                        </div>
            </div>
        </div>
    )
}   