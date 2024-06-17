import Ticketcard from "./ticketcard";
import { bookingInformation } from "@/app/lib/definition";
import Link from "next/link";
export default function Mybookingtable({booking} : {booking : any[]}){
    return (
        <div className=" mt-10 w-full h-[600px] p-1 shadow-md flex ">
            {
                booking.map((booking : any) => (
                    <div className="w-full flex bg-blue-500 border-black  flex-grow justify-between px-3 gap-8 items-center border-2 h-[100px]">
                        <div>
                            <p className="text-sm font-semibold text-white">Flight Number:</p>
                            <p className="font-bold text-white text-2xl">{booking.flightnumber}</p>
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-white">From:</p>
                            <p className="font-bold text-white text-2xl">{booking.departcity}</p>
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-white">To:</p>
                            <p className="font-bold text-white text-2xl">{booking.arrivalcity}</p>
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-white">Airlines:</p>
                            <p className="font-bold text-white text-2xl">{booking.airlinename}</p>
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-white">Total Passenger:</p>
                            <p className="font-bold text-white text-2xl">{booking.totalpassenger} Passengers</p>
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-white">Payment Status:</p>
                            <p className=" capitalize text-green-300 font-bold text-2xl">{booking.paymentstatus}</p>
                        </div>
                        <Link href={`my-booking/${booking.bookingid}/ticket`} className="w-[110px] h-[50px] rounded-md bg-green-600 flex-center text-lg font-bold text-white">
                            Details
                        </Link>
                    </div>
                ))
            }
            
        </div>
    );
}