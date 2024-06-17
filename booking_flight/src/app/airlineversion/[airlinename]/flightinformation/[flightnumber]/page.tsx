import { inter,poppins,lusitana } from "@/app/ui/component/asset/font";
import { fetchFlightwithFlightNumber } from "@/app/lib/data";
import { fetchPassengerInformation } from "@/app/lib/data";
import { IoPerson } from "react-icons/io5";
import Image from "next/image";
export default async function page({params}:{params : {flightnumber : string}}){
    const [flight] = await Promise.all([fetchFlightwithFlightNumber({flightnumber : params.flightnumber})]);
    const passengers = await fetchPassengerInformation({flightid : flight.flightid}); 
    console.log(passengers);
    return (
        <div className="container mx-auto flex flex-col gap-3 p-10">
            <h1 className={`${poppins.className} font-bold text-5xl`}>Flight Information:</h1>
            <div className="w-full flex-center mt-10">
            <Image src='/assets/plane.jpeg' className="rounded-3xl" alt="flight" width={1000} height={300}></Image>
            </div>
            <h1 className={`${poppins.className} font-bold  mt-20 text-4xl text-gray-500 mb-5`}>Flight Number: {params.flightnumber}</h1>
            <div className='flex flex-row justify-between  w-full'> 
                <div className='flex flex-col gap-3'>
                    <h1 className={`${poppins.className} font-bold text-2xl`}>Departure City: {flight.departcity} ({flight.departcountry})</h1>
                    <h1 className={`${poppins.className} font-bold text-2xl`}>Departure Airport: {flight.departairport} ({flight.departairportid})</h1>
                    <h1 className={`${poppins.className} font-bold text-2xl`}>Arrival City: {flight.arrivalcity} ({flight.arrivalcountry}) </h1>
                    <h1 className={`${poppins.className} font-bold text-2xl`}>Arrival Airport: {flight.arrivalairport} ({flight.arrivalairportid})</h1>
                    <h1 className={`${poppins.className} font-bold text-2xl`}>Plane: {flight.aircrafttype}</h1>
                </div>
                <div className='flex flex-col gap-3'>
                    <h1 className={`${poppins.className} font-bold text-2xl`}>Departure Date: {flight.departdate} ({flight.departtime1})</h1>
                    <h1 className={`${poppins.className} font-bold text-2xl`}>Arrival Date: {flight.arrivaldate} ({flight.arrivaltime1}) </h1>
                    <h1 className={`${poppins.className} font-bold text-2xl`}>Seats: {flight.totalofseat}</h1>  
                    <h1 className={`${poppins.className} font-bold text-2xl`}>Prices: {flight.price}</h1>  
                </div>     
                           
            </div>
            <h1 className={`${poppins.className} font-bold  mt-20 text-4xl text-gray-500 mb-5`}>Passenger Information: </h1>
            <div className='flex flex-col gap-2 border-2 p-2 border-black h-[1200px] overflow-auto  w-full'> 
                {
                    passengers.map((passenger : any) => (
                        <div className='flex items-center bg-blue-500 text-white justify-start  flex-row border-2 border-black gap-8'>
                            <IoPerson className="text-9xl text-green-400" />

                            <div className="w-1/3">
                                <h1 className={`${lusitana.className} font-semibold  text-2xl`}>Passenger Name: {passenger.firstname} {passenger.lastname}</h1>
                                <h1 className={`${lusitana.className} font-semibold   text-2xl`}>Passport: {passenger.passportnum}</h1>
                            </div>
                            <div className="w-1/3">
                                <h1 className={`${lusitana.className} font-semibold   text-2xl`}>BirthDate: {passenger.dob}</h1>
                                <h1 className={`${lusitana.className}  font-semibold  text-2xl`}>Gender: {passenger.gender}</h1>
                            </div>
                            <div className="w-1/3">
                            <h1 className={`${lusitana.className} font-semibold   text-2xl`}>Seatfor: {passenger.seatfor}</h1>
                            <h1 className={`${lusitana.className} font-semibold   text-2xl`}>Passport: {passenger.nationality}</h1>
                            </div>
                        </div>
                    ))
                }
                            
            </div>
        </div>
    );
}