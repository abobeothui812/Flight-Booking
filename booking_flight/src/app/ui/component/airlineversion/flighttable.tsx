import { FlightSearchInformation } from "@/app/lib/definition";
import Link from 'next/link';
export default function Flighttable({flights} : {flights : FlightSearchInformation[]}){
    return(
        <div className="w-full h-[800px] border-black border-2 p-2">
            <div className="w-full  ">
                <div className="w-10/12 flex justify-between   ">
                        <div className="flex w-1/6 font-bold justify-start items-center text-xl ">Flight Number</div>
                        <div className="flex w-1/6 font-bold justify-start items-center text-xl">Departure</div>
                        <div className="flex w-1/6 font-bold justify-start items-center text-xl">Arrival</div>
                        <div className="flex w-1/6 font-bold justify-start items-center text-xl">Departure Time</div>
                        <div className="flex  w-1/6 font-bold justify-start items-center text-xl">Arrival Time</div>
                        <div className="flex w-1/6 font-bold justify-start items-center text-xl">Aircraft Type</div>
                </div>
                <div className="flex flex-col w-full gap-2 mt-5  justify-between ">
                    {flights.map((flight : FlightSearchInformation ) => (
                        <div className="w-full h-[70px] flex justify-between items-center  border-2 text-white text-lg p-2 bg-blue-500  border-slate-950 " key={flight.flightnumber}>
                            <div className="w-10/12 flex justify-between   " >
                                <div className="w-1/6 flex justify-start items-center">{flight.flightnumber}</div>
                                <div className="w-1/6 flex justify-start items-center">{flight.departcity}</div>
                                <div className="w-1/6 flex justify-start items-center">{flight.arrivalcity}</div>
                                <div className="w-1/6 flex justify-start items-center">{flight.departdate}</div>
                                <div className="w-1/6 flex justify-start items-center">{flight.arrivaldate}</div>
                                <div className="w-1/6 flex justify-start items-center">{flight.aircrafttype}</div>
                            </div>
                            <Link href={`/airlineversion/${flight.airlinename}/flightinformation/${flight.flightnumber}`} className='w-[200px] h-[40px] border-2 border-gray-400 rounded-lg font-bold flex-center bg-green-700'>More Details</Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}