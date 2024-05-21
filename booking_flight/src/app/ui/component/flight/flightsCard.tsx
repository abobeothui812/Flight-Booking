import { FlightData } from "next/dist/server/app-render/types"
import { MdFlight} from "react-icons/md"
import { HiOutlineMinus } from "react-icons/hi"
export default function FlightsCard() {
    return(
        <div className="w-[900px] h-[400px] flex flex-row shadow-sm rounded-lg border-2">
            <div className="w-[730px] h-full flex flex-col  gap-5 border-r-2 p-6">
                <h3 className="text-lg">June 10,2023 - Departure</h3>
                <div className=" flex-row flex justify-center items-start">
                    <div className="flex text-slate-700 gap-3   w-1/5 text-xl  flex-col justify-between items-center p-4">
                        <p className="text-4xl">10:00</p>
                        <p className="text-md text-gray-500">Ha Noi</p>
                    </div>
                    <div className="flex-center flex-col grow mt-5">
                        
                        <MdFlight className="w-[50px] h-[50px] gap-3  text-blue-600"></MdFlight>
                        <p className="text-md text-gray-500">2 h 0 m</p>
                        <p className="text-md text-gray-500">Direct</p>
                        
                    </div>
                    <div className="flex text-slate-700 gap-3  text-xl overflow w-1/5 flex-col justify-between items-center p-4">
                        <p className="text-4xl">12:00 </p>
                        <p className="text-md text-gray-500">Ho Chi Minh</p>
                    </div>
                </div>

                <div className=" flex-row flex justify-center items-start">
                    <div className="flex text-slate-700 gap-3 overflow  w-1/5 text-xl  flex-col justify-between items-center p-4">
                        <p className="text-4xl">10:00</p>
                        <p className="text-md text-gray-500">Ho Chi Minh</p>
                    </div>
                    <div className="flex-center flex-col grow mt-5">
                        
                        <MdFlight className="w-[50px] h-[50px] gap-3  text-blue-600"></MdFlight>
                        <p className="text-md text-gray-500">2 h 0 m</p>
                        <p className="text-md text-gray-500">Direct</p>
                        
                    </div>
                    <div className="flex text-slate-700 gap-3  text-xl overflow w-1/5 flex-col justify-between items-center p-4">
                        <p className="text-4xl">12:00 </p>
                        <p className="text-md text-gray-500">Ha Noi</p>
                    </div>
                </div>
            </div>

            <div className="flex flex-grow flex-col justify-center items-center">
                <p>$50</p>
                <button className="BlueBtn">Select this flight</button>
            </div>
        </div>
    )
}