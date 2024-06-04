import { MdFlight} from "react-icons/md"
import { FlightSearchInformation } from "@/app/lib/definition"
import { poppins } from "../asset/font";
export default function EachFlight({fl} : {fl : FlightSearchInformation}) {
    fl.departdate = new Date(fl.departdate).toLocaleDateString('en-US', {
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    return(
        <div className="">
            <p className={`font-semibold ${poppins.className} text-lg `}>{fl.departdate} - Departure</p>
            <div className=" flex-row flex  justify-between items-start px-1">
                        <div className="flex text-slate-700 gap-2 overflow  min-w-[250px] flex-shrink-0  text-xl  flex-col justify-between items-center p-4">
                            <p className="text-5xl font-semibold">{fl.departtime1}</p>
                            <div className="flex-center flex-col">
                            <p className="text-sm text-gray-500">{fl.departairport}</p>
                            <p className=" text-gray-500 text-base">({fl.departairportid})</p>
                            </div>
                        </div>
                        <div className="flex-center flex-col grow mt-5">
                            <MdFlight className="w-[50px] h-[50px] gap-3  text-blue-600"></MdFlight>
                            <p className="text-md text-gray-500">{fl.timeofflight}</p>
                            <p className="text-md font-semibold text-gray-500">Direct</p>
                            
                        </div>
                        <div className="flex text-slate-700 gap-2 text-xl overflow min-w-[250px] flex-shrink-0  flex-col justify- items-center p-4">
                            <p className="text-5xl font-semibold">{fl.arrivaltime1}</p>
                            <div className="flex-center flex-col">
                            <p className="text-sm text-gray-500">{fl.arrivalairport}</p>
                            <p className=" text-gray-500 text-base">({fl.arrivalairportid})</p>
                            </div>
                        </div>
            </div>
        </div>
    )
}   