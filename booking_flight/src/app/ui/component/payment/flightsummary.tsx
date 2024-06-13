import { PiAirplaneTakeoff } from "react-icons/pi"
import { lusitana } from "../asset/font"
import { FlightSearchInformation,bookingInformation,PassengerInformation } from "@/app/lib/definition"
import { PiAirplaneInFlight } from "react-icons/pi";
import { IoManSharp } from "react-icons/io5";
import { FaChild } from "react-icons/fa6";
import { FaBaby } from "react-icons/fa";
export default function FlightSummary({flight,booking,Bookingpassenger}:{flight : FlightSearchInformation,booking : bookingInformation,Bookingpassenger: PassengerInformation[]}){
    flight.departdate = new Date(flight.departdate).toLocaleDateString('en-US', {
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });

    flight.arrivaldate = new Date(flight.arrivaldate).toLocaleDateString('en-US', {
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    return(
        <div>
            <div className="w-full h-[80px]  rounded-t-lg flex ">
                <div className="w-[70px] rounded-tl-lg h-full flex-center  bg-sky-500 ">
                <PiAirplaneTakeoff className="w-[50px] h-[50px]  "></PiAirplaneTakeoff>
                </div>
                <div className="bg-sky-300 flex justify-center items-center rounded-tr-lg flex-grow flex-col">
                <h1 className={`${lusitana.className} font-bold text-xl`}>Flight Summary</h1>
                <p className="text-md">Flight Number: {flight.flightnumber}</p>
                </div>
            </div>
            <div className=" flex flex-col p-3">
                <div className="flex flex-col">
                    <p className="font-semibold text-lg">{flight.departcity} ({flight.departairportid}) to {flight.arrivalcity} ({flight.arrivalairportid})</p>
                    <p className=" text-md">{flight.airlinename}- {booking.seattype}</p>
                </div>
                <div className=" gap-4 flex-row flex-center mt-2 mb-3 ">
                    <div className="flex-center flex-col border-2 px-5 py-2 rounded-xl">
                        <p className="font-semibold">{flight.departtime1}</p>
                        <p className="text-sm text-slate-400">{flight.departdate}</p>
                    </div>
                        <div className={`${lusitana.className} font-bold`}>
                            {flight.timeofflight}
                            <PiAirplaneInFlight className="w-[30px] h-[30px]"></PiAirplaneInFlight>
                        </div>
                    <div className="flex-center flex-col border-2 px-5 py-2 rounded-xl">
                        <p className="font-semibold">{flight.arrivaltime1}</p>
                        <p className="text-sm text-slate-400">{flight.arrivaldate}</p>
                    </div>
                </div>
                <hr />
                <div >
                    <p className={`${lusitana.className} font-semibold mt-3`}>Passenger(s) Details:</p>
                    <ul className={`${lusitana.className} font-semibold mt-3`}>
                        {Bookingpassenger.map((passenger : PassengerInformation) => {
                        // Sử dụng toán tử điều kiện để kiểm tra
                        return  (
                        ( passenger.seatfor === 'adults' &&
                        <div className="flex justify-start gap-2 items-center">
                            <IoManSharp />
                            <li key={passenger.papposrtnum}>{passenger.gender === 'Male' ? "Mr" : 'Mrs'} {passenger.firstname} {passenger.lastname}
                            </li>
                        </div>    
                        
                        ) || ( passenger.seatfor === 'children' &&
                            <div className="flex justify-start gap-2 items-center">
                                <FaChild />
                                <li key={passenger.papposrtnum}>
                                {passenger.firstname} {passenger.lastname}
                                </li>
                            </div>    
                            
                            ) ||( passenger.seatfor === 'infants' &&
                                <div className="flex justify-start gap-2 items-center">
                                    <FaBaby />
                                    <li key={passenger.papposrtnum}>
                                    {passenger.firstname} {passenger.lastname}
                                    </li>
                                </div>    
                                
                                )
                        ) // Hoặc có thể trả về một element khác hoặc bỏ qua
                         })}
                    </ul>
                </div>
            </div>
        </div>
    )
}