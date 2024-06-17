import { inter,poppins } from "@/app/ui/component/asset/font";
import { fetchFlightwithAirline } from "@/app/lib/data";
import Flighttable from "@/app/ui/component/airlineversion/flighttable"; 
import Link from "next/link";
export default async function page({params}:{params : {airlinename : string}}){
    const decodedAirlineName = decodeURIComponent(params.airlinename);
    const [flights,airports] = await Promise.all([fetchFlightwithAirline({AirlineName : decodedAirlineName})]);
    return (
        <div className="container mx-auto flex flex-col gap-3 p-10">
            <h1 className={`${poppins.className} font-bold text-6xl`}>Welcome back {decodedAirlineName}!</h1>
            <div className='flex flex-col mt-20 w-full'>
                <div className="w-full flex justify-between">
                    <h1 className={`${poppins.className} font-bold text-4xl mb-5`}>Flights:</h1>
                    <Link href={`/airlineversion/${params.airlinename}/create-flight`} className='BlueBtn flex-center text-xl font-bold w-[200px] h-[50px]'>Create a Flight</Link>
                </div>
                <Flighttable flights={flights}></Flighttable> 
            </div>
        </div>
    );
}